import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DEFAULT_CANVAS, DEFAULT_X, ImageType, ReducersType } from "./types";
import { photoEditorActions } from "../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import PanningToggle from "./topButtons/panningButton";
import ZoomButton from "./topButtons/zoomButton";

const PhotoEditorContainer = styled.div<{ view: number }>`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 15%;
  background-color: white;
  z-index: 1001;
  display: ${(props) => (props.view == 1 ? "grid" : "none")};
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5fr 1fr;
  justify-content: center;
  align-items: center;

  div {
    border: 1px solid black;
  }
`;

const PhotoEditorOverlay = styled.div<{ view: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: ${(props) => (props.view == 1 ? "block" : "none")};
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
  const { isEditing, photo } = useSelector((state: ReducersType) => {
    return state.photoEditorReducer;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoCanvas, setPhotoCanvas] = useState<any>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [view, setView] = useState<number>(1);

  useEffect(() => {
    const canvas = new fabric.Canvas(photoEditorCanvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
      backgroundColor: "black",
    });
    canvas.renderAll();

    setPhotoCanvas(canvas);
  }, []);

  useEffect(() => {
    if (photoCanvas) {
      canvas.discardActiveObject();
      photoCanvas.discardActiveObject();
      photoCanvas.clear();
      fabric.Image.fromURL(photo.getSrc(), (Img: ImageType) => {
        Img.originX = "center";
        Img.originY = "center";
        Img.left = Math.round(photoCanvas.width / 2);
        Img.top = Math.round(photoCanvas.height / 2);

        if (Img.width !== undefined) {
          const scale = DEFAULT_X / Img.width;
          Img.scaleX = scale;
          Img.scaleY = scale;
        }

        photoCanvas.add(Img);
        photoCanvas.renderAll();
      });
    }
  }, [photo]);

  const panFunction = (set: boolean) => {
    setIsPanning(set);
  };

  const drawFunction = (set: boolean) => {
    setIsDrawing(set);
  };

  const shapeChange = (shape: string) => {
    if (photoCanvas === null) return;

    fabric.Image.fromURL(`/${shape}.png`, (frameImg: ImageType) => {
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";
      photoCanvas.add(frameImg);
      photoCanvas.renderAll();
    });
  };

  const editCropper = (imageOrdy: any, frameOrdy: any) => {
    let returning = null;
    const frame = frameOrdy.getCoords();
    const image = imageOrdy.getCoords();

    console.log(frame, image);

    if (
      frame[0].x >= image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("중앙");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: frameOrdy.width * frameOrdy.scaleX,
        height: frameOrdy.height * frameOrdy.scaleY,
      };
    } else if (
      //왼쪽위
      frame[0].x < image[0].x &&
      frame[0].y < image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("왼쪽위");
      returning = {
        cropX: image[0].x - frame[0].x,
        cropY: image[0].y - frame[0].y,
        width: frame[2].x - image[0].x,
        height: frame[2].y - image[0].y,
      };
    } else if (
      //위
      frame[0].x >= image[0].x &&
      frame[0].y < image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("위");
      returning = {
        cropX: image[0].x - frame[0].x,
        cropY: frame[0].y - image[0].y,
        width: frame[2].x - frame[0].x,
        height: frame[2].y - image[0].y,
      };
    } else if (
      //오른쪽위
      frame[0].x >= image[0].x &&
      frame[0].y < image[0].y &&
      frame[2].x >= image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("오른쪽위");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: image[0].y - frame[0].y,
        width: image[2].x - frame[0].x,
        height: frame[2].y - image[0].y,
      };
    } else if (
      //오른쪽
      frame[0].x >= image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x >= image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("오른쪽");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: image[2].x - frame[0].x,
        height: frame[2].y - frame[0].y,
      };
    } else if (
      //오른쪽아래
      frame[0].x >= image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x >= image[2].x &&
      frame[2].y >= image[2].y
    ) {
      console.log("오른쪽아래");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: image[2].x - frame[0].x,
        height: image[2].y - frame[0].y,
      };
    } else if (
      //아래
      frame[0].x >= image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y >= image[2].y
    ) {
      console.log("아래");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: frame[2].x - frame[0].x,
        height: image[2].y - frame[0].y,
      };
    } else if (
      //왼쪽아래
      frame[0].x < image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y >= image[2].y
    ) {
      console.log("왼쪽아래");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: frame[2].x - image[2].x,
        height: image[2].y - frame[0].y,
      };
    } else if (
      //왼쪽
      frame[0].x < image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("왼쪽");
      returning = {
        cropX: image[0].x - frame[0].x,
        cropY: frame[0].y - image[0].y,
        width: image[0].x - frame[2].x,
        height: frame[2].y - frame[0].y,
      };
    } else if (
      //상하
      frame[0].x >= image[0].x &&
      frame[0].y < image[0].y &&
      frame[2].x < image[2].x &&
      frame[2].y >= image[2].y
    ) {
      console.log("상하");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: image[0].y - frame[0].y,
        width: frame[0].x - frame[2].x,
        height: image[0].y - image[2].y,
      };
    } else if (
      //좌우
      frame[0].x < image[0].x &&
      frame[0].y >= image[0].y &&
      frame[2].x >= image[2].x &&
      frame[2].y < image[2].y
    ) {
      console.log("좌우");
      returning = {
        cropX: frame[0].x - image[0].x,
        cropY: frame[0].y - image[0].y,
        width: image[0].x - image[2].x,
        height: frame[0].y - frame[2].y,
      };
    }

    if (returning)
      returning = {
        cropX: Math.abs(Math.round(returning.cropX)),
        cropY: Math.abs(Math.round(returning.cropY)),
        width: Math.abs(Math.round(returning.width)),
        height: Math.abs(Math.round(returning.height)),
      };

    return returning;
  };

  const editComplete = () => {
    if (photoCanvas == null) return;
    canvas.discardActiveObject();
    const objects = photoCanvas.getObjects();

    const editImg = editCropper(objects[0], objects[1]);
    console.log(editImg);

    const group = new fabric.Group(objects);
    group.cloneAsImage((img: any) => {
      img.set({
        left: Math.round(photo.left),
        top: Math.round(photo.top),
        selectable: true,
        erasable: false,
        cropX: editImg?.cropX,
        cropY: editImg?.cropY,
        width: editImg?.width,
        height: editImg?.height,
      });
      canvas.remove(photo);
      canvas.add(img);
    });

    canvas.renderAll();

    dispatch(photoEditorActions.setIsEditing(false));
  };

  const editCancle = () => {
    const objects = photoCanvas.getObjects();
    if (objects) photoCanvas.remove(objects);
    photoCanvas.renderAll();

    dispatch(photoEditorActions.setIsEditing(false));
  };

  const zoomFunction = (set: number) => {
    setZoom(set);
  };

  const viewFucntion = (set: number) => {
    setView(set);
  };

  const resetFunction = () => {
    setZoom(1);
    setView(1);
  };

  return (
    <>
      <PhotoEditorOverlay view={isEditing ? 1 : 0}>
        <PhotoEditorContainer view={isEditing ? 1 : 0}>
          <PhotoEditorCutterContainer>
            <PanningToggle
              canvas={photoCanvas}
              isPanning={isPanning}
              setPan={panFunction}
              setDraw={drawFunction}
            />
            <ZoomButton
              canvas={photoCanvas}
              setZoom={zoomFunction}
              setView={viewFucntion}
              reset={resetFunction}
              zoom={zoom}
              view={view}
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
            <button onClick={editCancle}>취소</button>
          </PhotoEditorButtons>
        </PhotoEditorContainer>
      </PhotoEditorOverlay>
    </>
  );
}
