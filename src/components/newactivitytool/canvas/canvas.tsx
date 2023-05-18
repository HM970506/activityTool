import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { CanvasBackground } from "../styles/commonStyle";
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

  const debounceOnChange = debounce(() => {
    if (category == DRAWTOOLS) canvas.isDrawingMode = true;
  }, 500);

  //function setting함수를 여기 넣지 않은 이유: canvas.getPointer함수를 사용하지 못하게 됨!
  const bind = useGesture({
    onPinch: ({ origin, offset }) => {
      canvas.isDrawingMode = false;

      const nowZoom = Math.round(offset[0] * 10) / 10;
      canvas.zoomToPoint(
        { x: Math.round(origin[0]), y: Math.round(origin[1]) },
        nowZoom != 0 ? nowZoom : 1
      );
      dispatch(zoomActions.setZoom(canvas.getZoom()));

      debounceOnChange();
    },
  });

  //핀치줌이 on 되면 0.5초정도를 세어서 그 직후에 드로우모드를 원래 상태로 돌려놓기..? 는 어떨까나. 디바운싱으로..

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
