import { useDispatch, useSelector } from "react-redux";
import {
  DEFAULT_CANVAS,
  ImageType,
  ReducersType,
  canvasType,
} from "../../../types";
import { photoEditorActions } from "../../../../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import {
  CheckButton,
  PhotoEditorOverlay,
  OptionButton,
  PhotoOption1,
  PhotoEditButtonInner,
} from "./style";
import { ReactComponent as Cut } from "./svg/cut.svg";
import { ReactComponent as Diagram } from "./svg/diagram.svg";
import { ReactComponent as Filter } from "./svg/filter.svg";
import { ReactComponent as Frame } from "./svg/frame.svg";

import { DownButtonsContainer, Icon } from "../../../style";
import cropper from "./cropper";
import { useSpring } from "react-spring";
import editControlHandler from "../../../common/editControlHandler";
import Correction from "./correction";
import { Shapes } from "./shapes";

export default function PhotoEditor() {
  const { isEditing, photo } = useSelector((state: ReducersType) => {
    return state.photoEditorReducer;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoCanvas, setPhotoCanvas] = useState<canvasType>(null);
  const [option, setOption] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const photoCanvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(0,0,0,0)",
    });

    setPhotoCanvas(photoCanvas);
    canvas.discardActiveObject();
    photoCanvas.discardActiveObject();
    photoCanvas.clear();

    photoCanvas.on({
      "selection:updated": () => {
        editControlHandler(photoCanvas);
      },
      "selection:created": () => {
        editControlHandler(photoCanvas);
      },
    });

    photoReady(photo, photoCanvas);
  }, []);

  const photoReady = (photo: any, photoCanvas: canvasType) => {
    // if (photo.type == "group") {
    //   photoCanvas.add(photo);
    //   photoCanvas.setActiveObject(photo);
    //   photoCanvas.getActiveObject().toActiveSelection();
    //   photoCanvas.requestRenderAll();
    //   photoCanvas.getActiveObjects()[0].selectable = false;
    //   photoCanvas.discardActiveObject();
    // } else {

    photo.selectable = false;
    photo.original = photo.original ? photo.original : photo.getSrc();
    photo.left = photo.left - canvas.viewportTransform[4];
    photo.top = photo.top - canvas.viewportTransform[5];
    photoCanvas.add(photo);
    photoCanvas.renderAll();
    //}
  };

  const editComplete = () => {
    if (photoCanvas == null) return;
    canvas.discardActiveObject();
    const objects = photoCanvas.getObjects();
    if (objects.length >= 2 && photo) {
      // const group = new fabric.Group(objects, {
      //   selectable: true,
      //   erasable: false,
      // });
      // canvas.remove(photo);
      // canvas.add(group);
      const editImg = cropper(objects[0], objects[1]); //이건 잘라야 하는 좌표만 줌.

      //여기도 보정값을 줘야 한다..
      const left =
        Math.round(
          (objects[1].oCoords.tl.x + canvas.viewportTransform[4]) * 10
        ) / 10;
      const top =
        Math.round(
          (objects[1].oCoords.tl.y + canvas.viewportTransform[5]) * 10
        ) / 10;

      const group = new fabric.Group(objects);
      group.cloneAsImage((img: ImageType) => {
        img.original = photo.original;
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

        canvas.remove(photo);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    } else {
      const objects = photoCanvas.getObjects();

      photoCanvas.remove(objects);
      photoCanvas.renderAll();

      if (photo) {
        photo.selectable = true;
        canvas.add(photo);
      }
      canvas.renderAll();
    }

    dispatch(photoEditorActions.setIsEditing(false));
  };

  const prop1 = useSpring({
    from:
      option && category === "비율"
        ? { backgroundColor: "white", stroke: "#898885", color: "#898885" }
        : { backgroundColor: "#859AB4", stroke: "white", color: "white" },
    to:
      option && category === "비율"
        ? { backgroundColor: "#859AB4", stroke: "white", color: "white" }
        : { backgroundColor: "white", stroke: "#898885", color: "#898885" },
  });
  const prop2 = useSpring({
    from:
      option && category === "도형"
        ? { backgroundColor: "white", stroke: "#898885", color: "#898885" }
        : { backgroundColor: "#859AB4", stroke: "white", color: "white" },
    to:
      option && category === "도형"
        ? { backgroundColor: "#859AB4", stroke: "white", color: "white" }
        : { backgroundColor: "white", stroke: "#898885", color: "#898885" },
  });
  const prop3 = useSpring({
    from:
      option && category === "보정"
        ? { backgroundColor: "white", stroke: "#898885", color: "#898885" }
        : { backgroundColor: "#859AB4", stroke: "white", color: "white" },
    to:
      option && category === "보정"
        ? { backgroundColor: "#859AB4", stroke: "white", color: "white" }
        : { backgroundColor: "white", stroke: "#898885", color: "#898885" },
  });
  const prop4 = useSpring({
    from:
      option && category === "액자"
        ? { backgroundColor: "white", stroke: "#898885", color: "#898885" }
        : { backgroundColor: "#859AB4", stroke: "white", color: "white" },
    to:
      option && category === "액자"
        ? { backgroundColor: "#859AB4", stroke: "white", color: "white" }
        : { backgroundColor: "white", stroke: "#898885", color: "#898885" },
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
          <Icon src={"/diary/photo/confirm_chk.png"} />
        </CheckButton>
        <DownButtonsContainer>
          <OptionButton
            onClick={() => {
              optionHandler("비율");
            }}
          >
            {option && category === "비율" && <PhotoOption1>test</PhotoOption1>}
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
            {option && category === "도형" && (
              <Shapes photoCanvas={photoCanvas} />
            )}
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
            {option && category === "보정" && <Correction />}
            <PhotoEditButtonInner style={prop3}>
              <Filter />
              보정
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              optionHandler("액자");
            }}
          >
            <PhotoEditButtonInner style={prop4}>
              <Frame />
              액자
            </PhotoEditButtonInner>
          </OptionButton>
        </DownButtonsContainer>
      </PhotoEditorOverlay>
    </>
  );
}
