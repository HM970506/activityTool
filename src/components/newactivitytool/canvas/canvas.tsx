import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { CanvasBackground } from "../styles/commonStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS, ReducersType } from "../types";
import functionSetting from "./functionSetting";
import canvasSetting from "./canvasSetting";
import { useGesture, usePinch } from "@use-gesture/react";
import { zoomActions } from "../../../store/common/zoomSlice";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  //function setting함수를 여기 넣지 않은 이유: canvas.getPointer함수를 사용하지 못하게 됨!
  const bind = useGesture({
    onPinch: ({ da, origin, offset }) => {
      const nowZoom = Math.round(offset[0] * 10) / 10;
      canvas.zoomToPoint(
        { x: Math.round(origin[0]), y: Math.round(origin[1]) },
        nowZoom != 0 ? nowZoom : 1
      );
      dispatch(zoomActions.setZoom(canvas.getZoom()));
    },
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      pinchZoom: { state: 0, coord: { x: 0, y: 0 } },
    });
    canvas.freeDrawingBrush.inverted = true;

    fabricSetting();
    canvasSetting(canvas);
    windowSetting(canvas, dispatch);
    functionSetting(canvas, dispatch);

    canvas.renderAll();

    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  return (
    <CanvasBackground ref={containerRef} {...bind()}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
