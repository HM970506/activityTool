import { fabric } from "fabric-with-erasing";
import { fabric as fabricType } from "fabric";
import "fabric-history";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef } from "react";
import { CanvasBackground } from "../styles/indexStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS } from "../types";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
    });
    canvas.freeDrawingBrush.inverted = true;

    const test = new fabricType.Canvas("");

    console.log(typeof fabricType.Canvas);

    fabricSetting();
    windowSetting(dispatch, canvas);

    canvas.renderAll();
    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  return (
    <CanvasBackground ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
