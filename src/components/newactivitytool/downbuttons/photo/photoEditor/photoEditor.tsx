import { useDispatch, useSelector } from "react-redux";
import {
  DEFAULT_CANVAS,
  DEFAULT_X,
  ImageType,
  ReducersType,
  canvasType,
} from "../../../types";
import { photoEditorActions } from "../../../../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import cropper from "./cropper";
import {
  CheckButton,
  PhotoEditorCutter,
  PhotoEditorCutterContainer,
  PhotoEditorOverlay,
  OptionButton,
  PhotoOption1,
  PhotoOption2,
  FilterComponent,
} from "./style";
import functionSetting from "../../../canvas/functionSetting";
import { DownButtonsContainer } from "../../../styles/commonStyle";
import { OptionContainer } from "../../style";

const test = ["heart", "star", "lightning", "bubble"];

export default function PhotoEditor() {
  const { isEditing, photo } = useSelector((state: ReducersType) => {
    return state.photoEditorReducer;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoCanvas, setPhotoCanvas] = useState<canvasType>(null);
  const [option, setOption] = useState<string>("");

  useEffect(() => {
    const canvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(0,0,0,0)",
    });
    canvas.renderAll();
    functionSetting(canvas, undefined);

    setPhotoCanvas(canvas);
  }, []);

  useEffect(() => {
    if (photoCanvas && photo) {
      canvas.discardActiveObject();
      photoCanvas.discardActiveObject();
      photoCanvas.clear();
      photo.selectable = false;
      photoCanvas.add(photo);
      photoCanvas.renderAll();
    }
  }, [photoCanvas, photo]);

  const shapeChange = (shape: string) => {
    if (photoCanvas === null) return;

    const objects = photoCanvas.getObjects();
    const beforeCoord = { top: null, left: null };
    if (objects.length >= 2) {
      beforeCoord.top = objects[1].top;
      beforeCoord.left = objects[1].left;
    }

    fabric.Image.fromURL(`/diary/${shape}.png`, (frameImg: ImageType) => {
      frameImg.crossOrigin = "Anonymous";
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";
      frameImg.top = beforeCoord.top ? beforeCoord.top : 0;
      frameImg.left = beforeCoord.left ? beforeCoord.left : 0;
      photoCanvas.add(frameImg);
      photoCanvas.remove(objects[1]);
      photoCanvas.renderAll();
    });
  };

  // const cropper = new fabric.Rect({
  //   left: target.left,
  //   top: target.top,
  //   fill: "black",
  //   selectable: true,
  //   width: target.width && target.scaleX ? target.width * target.scaleX : 1,
  //   height:
  //     target.height && target.scaleY ? target.height * target.scaleY : 1,
  // });

  // cropper.setControlVisible("deleteControl", false);
  // cropper.setControlVisible("editControl", false);
  // target.selectable = false;
  // target.globalCompositeOperation = "source-atop";

  const editComplete = () => {
    if (photoCanvas == null) return;
    canvas.discardActiveObject();
    const objects = photoCanvas.getObjects();

    if (objects.length >= 2) {
      const editImg = cropper(objects[0], objects[1]);

      const group = new fabric.Group(objects);
      group.cloneAsImage((img: ImageType) => {
        photo.original
          ? (img.original = photo.original)
          : (img.original = photo.getSrc());
        img.left = Math.round(photo.left);
        img.top = Math.round(photo.top);
        img.selectable = true;
        img.erasable = false;
        img.cropX = editImg?.cropX;
        img.cropY = editImg?.cropY;
        img.width = editImg?.width;
        img.height = editImg?.height;
        img.crossOrigin = "Anonymous";

        canvas.remove(photo);
        canvas.add(img);
      });

      canvas.renderAll();
    }

    dispatch(photoEditorActions.setIsEditing(false));
  };

  const editCancle = () => {
    const objects = photoCanvas.getObjects();
    if (objects) photoCanvas.remove(objects);
    photoCanvas.renderAll();

    dispatch(photoEditorActions.setIsEditing(false));
  };

  return (
    <>
      <PhotoEditorOverlay view={isEditing ? 1 : 0}>
        <canvas ref={photoEditorCanvasRef}></canvas>

        <CheckButton onClick={editCancle}>체크</CheckButton>
        <DownButtonsContainer>
          <OptionButton
            onClick={() => {
              setOption("비율");
            }}
          >
            {option === "비율" && <PhotoOption1>test</PhotoOption1>}비율
          </OptionButton>
          <OptionButton
            onClick={() => {
              setOption("도형");
            }}
          >
            {option === "도형" && (
              <PhotoOption1>
                {test.map((value: string, key: number) => {
                  return (
                    <PhotoEditorCutter
                      key={`cutter_${key}`}
                      onClick={() => {
                        shapeChange(value);
                      }}
                    >
                      {value}
                    </PhotoEditorCutter>
                  );
                })}
              </PhotoOption1>
            )}
            도형
          </OptionButton>
          <OptionButton
            onClick={() => {
              setOption("보정");
            }}
          >
            {option === "보정" && (
              <PhotoOption2>
                <FilterComponent>
                  <p>원본</p>
                </FilterComponent>
                <FilterComponent>
                  <p>깨끗한</p>
                </FilterComponent>
                <FilterComponent>
                  <p>빛나는</p>
                </FilterComponent>
                <FilterComponent>
                  <p>밝은</p>
                </FilterComponent>
                <FilterComponent>
                  <p>부드러운</p>
                </FilterComponent>
                <FilterComponent>
                  <p>부드러운</p>
                </FilterComponent>
                <FilterComponent>
                  <p>부드러운</p>
                </FilterComponent>
              </PhotoOption2>
            )}
            보정
          </OptionButton>
          <OptionButton
            onClick={() => {
              setOption("액자");
            }}
          >
            액자
          </OptionButton>
        </DownButtonsContainer>
      </PhotoEditorOverlay>
    </>
  );
}
