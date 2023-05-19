import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { CanvasBackground } from "../style";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS, DRAWTOOLS, ReducersType } from "../types";
import canvasSetting from "./canvasSetting";
import { useGesture } from "@use-gesture/react";
import { zoomActions } from "../../../store/common/zoomSlice";
import functionSetting from "./functionSetting";
import { debounce } from "lodash";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  const drawModeDebounce = debounce(() => {
    if (category == DRAWTOOLS) canvas.isDrawingMode = true;
  }, 100);

  const zoomSetting = (zoom: number) => {
    const nowZoom = Math.round(zoom * 10) / 10;

    if (nowZoom > 10) return 10;
    else if (nowZoom < 0.1) return 0.1;
    else return nowZoom;
  };

  //function setting함수를 여기 넣지 않은 이유: canvas.getPointer함수를 사용하지 못하게 됨!
  const bind = useGesture({
    onPinch: ({ origin, offset }) => {
      canvas.isDrawingMode = false;

      const nowZoom = zoomSetting(offset[0]);
      canvas.zoomToPoint(
        { x: Math.round(origin[0]), y: Math.round(origin[1]) },
        nowZoom
      );
      dispatch(zoomActions.setZoom(canvas.getZoom()));

      drawModeDebounce();
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
    functionSetting(canvas);
    canvasSetting(canvas);
    windowSetting(canvas, dispatch);

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
