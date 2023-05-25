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
  PhotoEditButtonInner,
} from "./style";
import { ReactComponent as Cut } from "./svg/cut.svg";
import { ReactComponent as Diagram } from "./svg/diagram.svg";
import { ReactComponent as Filter } from "./svg/filter.svg";
import { ReactComponent as Frame } from "./svg/frame.svg";

import { ButtonInner, DownButtonsContainer } from "../../../style";
import cropper from "./cropper";
import { useSpring } from "react-spring";
import editControlHandler from "../../../common/editControlHandler";

const test = ["heart", "star", "lightning", "bubble"];

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
    photoCanvas.add(photo);
    photoCanvas.renderAll();
    //}
  };

  const shapeChange = (shape: string) => {
    if (photoCanvas === null) return;

    const objects = photoCanvas.getObjects();

    fabric.Image.fromURL(`/diary/frame/${shape}.png`, (frameImg: ImageType) => {
      frameImg.objectType = "frame";
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
      const editImg = cropper(objects[0], objects[1]);

      // const group = new fabric.Group(objects, {
      //   selectable: true,
      //   erasable: false,
      // });
      // canvas.remove(photo);
      // canvas.add(group);
      console.log(editImg);

      canvas.add(editImg);
      canvas.renderAll();
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

  //

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

  return (
    <>
      <PhotoEditorOverlay view={isEditing ? 1 : 0}>
        <canvas ref={photoEditorCanvasRef}></canvas>

        <CheckButton onClick={editComplete}>체크</CheckButton>
        <DownButtonsContainer>
          <OptionButton
            onClick={() => {
              if (category !== "비율") {
                setCategory("비율");
                setOption(true);
              } else {
                setCategory("");
                setOption(false);
              }
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
              if (category !== "도형") {
                setCategory("도형");
                setOption(true);
              } else {
                setCategory("");
                setOption(false);
              }
            }}
          >
            {option && category === "도형" && (
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
            <PhotoEditButtonInner style={prop2}>
              <Diagram />
              도형
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              if (category !== "보정") {
                setCategory("보정");
                setOption(true);
              } else {
                setCategory("");
                setOption(false);
              }
            }}
          >
            {option && category === "보정" && (
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
            <PhotoEditButtonInner style={prop3}>
              <Filter />
              보정
            </PhotoEditButtonInner>
          </OptionButton>
          <OptionButton
            onClick={() => {
              if (category !== "액자") {
                setCategory("액자");
                setOption(true);
              } else {
                setCategory("");
                setOption(false);
              }
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
