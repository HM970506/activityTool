import { useDispatch, useSelector } from "react-redux";

import {
  DEFAULT_CANVAS,
  DEFAULT_X,
  ImageType,
  ReducersType,
  canvasType,
} from "../types";
import { photoEditorActions } from "../../../store/common/photoEditorSlice";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric-with-erasing";
import PanningToggle from "../topButtons/panningButton";
import ZoomButton from "../topButtons/zoomButton";
import cropper from "./cropper";
import {
  PhotoEditorButtons,
  PhotoEditorContainer,
  PhotoEditorCutter,
  PhotoEditorCutterContainer,
  PhotoEditorOverlay,
} from "./style";
import functionSetting from "../canvas/functionSetting";

const test = ["heart", "star", "lightning", "bubble"];

export default function PhotoEditor() {
  const { isEditing, photo } = useSelector((state: ReducersType) => {
    return state.photoEditorReducer;
  });
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const photoEditorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [photoCanvas, setPhotoCanvas] = useState<canvasType>(null);
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
    functionSetting(canvas, undefined);

    setPhotoCanvas(canvas);
  }, []);

  useEffect(() => {
    if (photoCanvas && photo) {
      canvas.discardActiveObject();
      photoCanvas.discardActiveObject();
      photoCanvas.clear();
      fabric.Image.fromURL(
        photo.original ? photo.original : photo.getSrc(),
        (Img: ImageType) => {
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
        }
      );
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

    const objects = photoCanvas.getObjects();
    const beforeCoord = { top: null, left: null };
    if (objects.length >= 2) {
      beforeCoord.top = objects[1].top;
      beforeCoord.left = objects[1].left;
    }

    setIsPanning(false);

    fabric.Image.fromURL(`/diary/${shape}.png`, (frameImg: ImageType) => {
      frameImg.selectable = true;
      frameImg.globalCompositeOperation = "destination-atop";
      frameImg.top = beforeCoord.top ? beforeCoord.top : 0;
      frameImg.left = beforeCoord.left ? beforeCoord.left : 0;
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
