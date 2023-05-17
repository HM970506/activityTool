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
import {
  CheckButton,
  PhotoEditorOverlay,
  OptionButton,
  PhotoOption1,
  PhotoOption2,
  FilterComponent,
  OptionComponent,
} from "./style";

import { DownButtonsContainer } from "../../../styles/commonStyle";

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
    const photoCanvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(0,0,0,0)",
    });
    //패닝, 확대 기능 추가
    setPhotoCanvas(photoCanvas);
    canvas.discardActiveObject();
    photoCanvas.discardActiveObject();
    photoCanvas.clear();

    photoReady(photo, photoCanvas);
  }, []);

  const photoReady = (photo: any, photoCanvas: canvasType) => {
    if (photo.type == "group") {
      photoCanvas.add(photo);
      photoCanvas.setActiveObject(photo);
      photoCanvas.getActiveObject().toActiveSelection();
      photoCanvas.requestRenderAll();
      photoCanvas.getActiveObjects()[0].selectable = false;
      photoCanvas.discardActiveObject();
    } else {
      photoCanvas.add(photo);
      photoCanvas.renderAll();
    }
  };

  const shapeChange = (shape: string) => {
    if (photoCanvas === null) return;

    const objects = photoCanvas.getObjects();

    fabric.Image.fromURL(`/diary/${shape}.png`, (frameImg: ImageType) => {
      frameImg.crossOrigin = "Anonymous";
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";

      photoCanvas.add(frameImg);
      photoCanvas.remove(objects[1]);
      photoCanvas.renderAll();
    });
  };

  const editComplete = () => {
    if (photoCanvas == null) return;
    canvas.discardActiveObject();
    const objects = photoCanvas.getObjects();
    if (objects.length >= 2) {
      // const editImg = cropper(objects[0], objects[1]);
      // 크로퍼가 필요할 시 해당 부분에서 자르게 하기..

      const group = new fabric.Group(objects, {
        selectable: true,
        erasable: false,
      });
      canvas.remove(photo);
      canvas.add(group);
      canvas.renderAll();
    } else {
      const objects = photoCanvas.getObjects();
      photo.selectable = true;

      photoCanvas.remove(objects);
      photoCanvas.renderAll();

      canvas.add(photo);
      canvas.renderAll();
    }

    dispatch(photoEditorActions.setIsEditing(false));
  };

  // useEffect(() => {
  //   document.addEventListener("mouseup", (e: MouseEvent) => {
  //     if (e.target) setOption("");
  //   });
  // }, []);

  return (
    <>
      <PhotoEditorOverlay view={isEditing ? 1 : 0}>
        <canvas ref={photoEditorCanvasRef}></canvas>

        <CheckButton onClick={editComplete}>체크</CheckButton>
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
                    <OptionComponent
                      key={`cutter_${key}`}
                      onClick={() => {
                        shapeChange(value);
                      }}
                    >
                      {value}
                    </OptionComponent>
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
