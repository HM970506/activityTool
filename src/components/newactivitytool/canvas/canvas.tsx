import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef } from "react";
import { CanvasBackground } from "../styles/commonStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS, ReducersType } from "../types";
import functionSetting from "./functionSetting";
import canvasSetting from "./canvasSetting";
import { useGesture, usePinch } from "@use-gesture/react";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const bind = useGesture({
    onDrag: (state) => {
      console.log("drag");
    },
    onPinch: ({
      canceled,
      origin: [ox, oy],
      first,
      movement: [ms, m2],
      memo,
    }) => {
      if (canceled) return;
      const nowZoom = memo[0] * ms;

      //setZoom(nowZoom);
      canvas.zoomToPoint({ x: ox, y: oy }, nowZoom);
      return memo;
    },
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
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
