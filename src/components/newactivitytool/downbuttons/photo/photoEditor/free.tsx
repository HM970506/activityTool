import { ReducersType } from "../../../types";
import { FreecropButton, PhotoOption2 } from "./style";
import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { photoEditorActions } from "../../../../../store/common/photoEditorSlice";
import { isNumber } from "lodash";
import React from "react";

export default function FreeCrop() {
  const { photoCanvas } = useSelector(
    (state: ReducersType) => state.photoEditorReducer
  );
  const dispatch = useDispatch();
  const ordinary = photoCanvas.getObjects()[0];

  const reset = () => {
    photoCanvas.clear();
    photoCanvas.add(ordinary);
    photoCanvas.renderAll();
  };

  const rectangleCrop = () => {
    dispatch(photoEditorActions.setIsCroping(true));
    photoCanvas.selection = true;

    photoCanvas.on({
      "mouse:down": (o: any) => {
        photoCanvas.start = photoCanvas.getPointer(o.e);
      },
      "mouse:up": (o: any) => {
        const now = photoCanvas.getObjects().length;
        if (now === 0) photoCanvas.add(photoCanvas.getObjects()[0]);

        if (photoCanvas.start) {
          const start = photoCanvas.start;
          const end = photoCanvas.getPointer(o.e);
          const rect = new fabric.Rect({
            left: Math.min(start.x, end.x),
            top: Math.min(start.y, end.y),
            width: Math.abs(start.x - end.x),
            height: Math.abs(start.y - end.y),
            globalCompositeOperation: "destination-in",
          });

          if (now > 1) photoCanvas.remove(photoCanvas.getObjects()[1]);
          photoCanvas.add(rect);

          photoCanvas.start = undefined;
          photoCanvas.renderAll();
          photoCanvas.off("mouse:down");
          photoCanvas.off("mouse:up");
          photoCanvas.selection = false;
        }
      },
    });
  };

  const combinePaths = (paths: any) => {
    let singlePath = "";
    paths.path.forEach((path: []) => {
      path.forEach((now: string | number) => {
        if (isNumber(now)) singlePath += " " + Math.round(now * 100) / 100;
        else singlePath += " " + now;
      });
    });
    return singlePath;
  };

  const freeCrop = () => {
    dispatch(photoEditorActions.setIsCroping(true));
    photoCanvas.isDrawingMode = true;
    photoCanvas.freeDrawingBrush.color = "black";
    photoCanvas.freeDrawingBrush.width = 2;

    photoCanvas.on({
      "path:created": (o: any) => {
        const path = combinePaths(o.path);
        const objects = photoCanvas.getObjects();

        const group = new fabric.Group(objects, {
          clipPath: new fabric.Path(path, {
            top: o.path.top,
            left: o.path.left,
            absolutePositioned: true,
          }),
          selectable: false,
        });
        photoCanvas.clear();
        photoCanvas.add(group);
        photoCanvas.renderAll();
        photoCanvas.off("path:created");
        photoCanvas.isDrawingMode = false;
      },
    });
  };

  return (
    <PhotoOption2>
      <FreecropButton onClick={reset}>원래대로</FreecropButton>
      <FreecropButton onClick={rectangleCrop}>사각형</FreecropButton>
      <FreecropButton onClick={freeCrop}>자유</FreecropButton>
    </PhotoOption2>
  );
}
