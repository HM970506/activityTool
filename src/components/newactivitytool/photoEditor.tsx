import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DEFAULT_CANVAS, ImageType, ReducersType } from "./types";
import { photoEditorActions } from "../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import PanningToggle from "./topButtons/panningButton";

const PhotoEditorContainer = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 15%;
  background-color: white;
  z-index: 1001;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5fr 1fr;
  justify-content: center;
  align-items: center;

  div {
    border: 1px solid black;
  }
`;

const PhotoEditorOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
`;

const PhotoEditorButtons = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 30%;
    height: 60%;
  }
`;

const PhotoEditorCutterContainer = styled.div``;

const PhotoEditorCutter = styled.div`
  height: 10% impotant!;
`;
const test = ["heart", "star", "lightning", "bubble"];

export default function PhotoEditor() {
  const view = useSelector((state: ReducersType) => {
    return state.photoEditorReducer.view;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoCanvas, setPhotoCanvas] = useState<any>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(true);

  useEffect(() => {
    const canvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
      backgroundColor: "black",
    });

    fabric.Image.fromURL(`/test.jpg`, (Img: ImageType) => {
      Img.scaleX = 0.5;
      Img.scaleY = 0.5;
      Img.originX = "center";
      Img.originY = "center";
      Img.left = canvas.width / 2;
      Img.top = canvas.height / 2;

      canvas.add(Img);
      canvas.renderAll();
    });

    setPhotoCanvas(canvas);
  }, []);

  const panFunction = (set: boolean) => {
    setIsPanning(set);
  };

  const drawFunction = (set: boolean) => {
    setIsDrawing(set);
  };

  const shapeChange = (shape: string) => {
    if (photoCanvas == null) return;

    fabric.Image.fromURL(`/${shape}.png`, (frameImg: ImageType) => {
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";
      photoCanvas.add(frameImg);
      photoCanvas.renderAll();
    });
  };

  const editComplete = () => {
    if (photoCanvas == null) return;
    canvas.discardActiveObject();
    const objects = photoCanvas.getObjects();

    const group = new fabric.Group(objects, {
      left: 0,
      top: 0,
      selectable: true,
      erasable: false,
    });

    canvas.add(group);
    canvas.renderAll();
    photoCanvas.remove(objects);
    photoCanvas.renderAll();

    dispatch(photoEditorActions.setView(false));
  };

  return (
    <>
      {view && (
        <PhotoEditorOverlay>
          <PhotoEditorContainer>
            <PhotoEditorCutterContainer>
              <PanningToggle
                canvas={photoCanvas}
                isPanning={isPanning}
                setPan={panFunction}
                setDraw={drawFunction}
              />
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
            </PhotoEditorCutterContainer>
            <div>
              <canvas ref={photoEditorCanvasRef}></canvas>
            </div>
            <PhotoEditorButtons>
              <button onClick={editComplete}>완성</button>
              <button>취소</button>
            </PhotoEditorButtons>
          </PhotoEditorContainer>
        </PhotoEditorOverlay>
      )}
    </>
  );
}
