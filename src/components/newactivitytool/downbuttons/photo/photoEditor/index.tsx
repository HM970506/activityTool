import { useDispatch, useSelector } from "react-redux";
import { ImageType, ReducersType, canvasType } from "../../../types";
import { photoEditorActions } from "../../../../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import {
  CheckButton,
  PhotoEditorOverlay,
  OptionButton,
  PhotoEditButtonInner,
} from "./style";
import { ReactComponent as Cut } from "./svg/cut.svg";
import { ReactComponent as Diagram } from "./svg/diagram.svg";
import { ReactComponent as Filter } from "./svg/filter.svg";
import { ReactComponent as Free } from "./svg/free.svg";

import { DownButtonsContainer, Icon } from "../../../styles/style";
import cropper from "./cropper";
import { useSpring } from "react-spring";
import editControlHandler from "../../../common/editControlHandler";
import { Shapes } from "./shapes";
import Ratio from "./ratio";
import Filters from "./filters";
import FreeCrop from "./free";

export default function PhotoEditor() {
  const { isEditing, photo } = useSelector((state: ReducersType) => {
    return state.photoEditorReducer;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const photoCanvas = useSelector(
    (state: ReducersType) => state.photoEditorReducer.photoCanvas
  );
  const zoom = useSelector((state: ReducersType) => state.zoomReducer.zoom);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);

  const [option, setOption] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    fabric.Canvas.prototype.set({
      selectionColor: "rgba(255,0,0,0.3)",
      selectionBorderColor: "rgba(0, 255, 0, 0.3)",
      selectionLineWidth: 10,
    });

    const photoCanvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(0,0,0,0)",
      viewportTransform: [...canvas.viewportTransform],
      selection: false,
    });

    photoCanvas.zoomToPoint(
      { x: canvas.viewportTransform[4], y: canvas.viewportTransform[5] },
      zoom
    );

    dispatch(photoEditorActions.setPhotoCanvas(photoCanvas));
    canvas.discardActiveObject();
    photoCanvas.discardActiveObject();
    photoCanvas.clear();

    photoCanvas.on({
      "selection:updated": () => editControlHandler(photoCanvas),
      "selection:created": () => editControlHandler(photoCanvas),
    });
    photoReady(photo, photoCanvas);
  }, []);

  const photoReady = (photo: any, photoCanvas: canvasType) => {
    photo.selectable = false;
    photo.original = photo.original ? photo.original : photo.getSrc();
    photo.left = photo.left;
    photo.top = photo.top;
    photoCanvas.add(photo);
    photoCanvas.renderAll();
  };

  const coordCorrecting = (object: any) => {
    return {
      left:
        (Math.round((object.oCoords.tl.x * 100) / 100) -
          canvas.viewportTransform[4]) /
        canvas.viewportTransform[0],
      top:
        (Math.round((object.oCoords.tl.y * 100) / 100) -
          canvas.viewportTransform[5]) /
        canvas.viewportTransform[0],
    };
  };

  const editComplete = () => {
    const objects = photoCanvas.getObjects();

    if (objects.length > 1) {
      const crop = objects[1];

      const editImg = cropper(objects[0], crop);
      const { left, top } = coordCorrecting(crop);
      const group = new fabric.Group(objects);

      group.cloneAsImage((img: ImageType) => {
        img.left = left;
        img.top = top;
        img.selectable = true;
        img.erasable = false;
        img.cropX = editImg?.cropX;
        img.cropY = editImg?.cropY;
        img.width = editImg?.width;
        img.height = editImg?.height;
        img.crossOrigin = "Anonymous";
        img.objectType = "photo";
        canvas.add(img);
      });
    } else {
      if (objects[0].clipPath !== undefined) {
        const crop = objects[0].clipPath;

        const crop_absolute = {
          top: Math.round(crop.top * 100) / 100,
          left: Math.round(crop.left * 100) / 100,
          right: Math.round((crop.left + crop.width) * 100) / 100,
          bottom: Math.round((crop.top + crop.height) * 100) / 100,
        };
        const crop_relative = {
          top: crop_absolute.top - objects[0].top,
          left: crop_absolute.left - objects[0].left,
        };

        crop.top = crop_relative.top;
        crop.left = crop_relative.left;

        objects[0].cloneAsImage((img: ImageType) => {
          img.selectable = true;
          img.erasable = false;
          img.top = crop_absolute.top;
          img.left = crop_absolute.left;
          img.cropX = crop_absolute.left - objects[0].left;
          img.cropY = crop_absolute.top - objects[0].top;
          img.width = crop.width;
          img.height = crop.height;
          img.crossOrigin = "Anonymous";
          img.objectType = "photo";
          canvas.add(img);
        });
      } else {
        objects[0].selectable = true;
        objects[0].objectType = "photo";
        canvas.add(objects[0]);
      }
    }

    canvas.renderAll();

    dispatch(photoEditorActions.setIsEditing(false));
  };

  const before = {
    backgroundColor: "white",
    stroke: "#898885",
    color: "#898885",
  };
  const after = { backgroundColor: "#859AB4", stroke: "white", color: "white" };

  const prop1 = useSpring({
    from: option && category === "비율" ? before : after,
    to: option && category === "비율" ? after : before,
  });
  const prop2 = useSpring({
    from: option && category === "도형" ? before : after,
    to: option && category === "도형" ? after : before,
  });
  const prop3 = useSpring({
    from: option && category === "보정" ? before : after,
    to: option && category === "보정" ? after : before,
  });
  const prop4 = useSpring({
    from: option && category === "자유" ? before : after,
    to: option && category === "자유" ? after : before,
  });

  const optionHandler = (now: string) => {
    if (category !== now) {
      setCategory(now);
      setOption(true);
    } else {
      setCategory("");
      setOption(false);
    }
  };

  return (
    <>
      <PhotoEditorOverlay view={isEditing ? 1 : 0}>
        <canvas ref={photoEditorCanvasRef}></canvas>

        <CheckButton onClick={editComplete}>
          <Icon src={"/photo/confirm_chk.png"} />
        </CheckButton>

        <DownButtonsContainer>
          <OptionButton
            onClick={() => {
              optionHandler("비율");
            }}
          >
            {option && category === "비율" && <Ratio />}
            <PhotoEditButtonInner style={prop1}>
              <Cut />
              비율
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              optionHandler("도형");
            }}
          >
            {option && category === "도형" && <Shapes />}
            <PhotoEditButtonInner style={prop2}>
              <Diagram />
              도형
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              optionHandler("보정");
            }}
          >
            {option && category === "보정" && <Filters />}
            <PhotoEditButtonInner style={prop3}>
              <Filter />
              보정
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              optionHandler("자유");
            }}
          >
            {option && category === "자유" && <FreeCrop />}
            <PhotoEditButtonInner style={prop4}>
              <Free />
              자유
            </PhotoEditButtonInner>
          </OptionButton>
        </DownButtonsContainer>
      </PhotoEditorOverlay>
    </>
  );
}
