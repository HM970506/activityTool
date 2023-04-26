import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef } from "react";
import { CanvasBackground } from "../styles/indexStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS } from "../types";
import {
  panStep_1,
  panStep_2,
  panStep_3,
  stampStep_1,
  tapeStep_1,
  tapeStep_2,
  tapeStep_3,
} from "./functionSetting";
import { IEvent } from "fabric/fabric-impl";

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

    fabricSetting();
    windowSetting(dispatch, canvas);

    canvas.on({
      "mouse:down": (e: IEvent | any) => {
        if (canvas.taping === 1) tapeStep_1(canvas);
        else if (canvas.stamping !== "") stampStep_1(canvas);
        else if (canvas.panning === 1) panStep_1(e, canvas);
      },
      "mouse:move": (e: IEvent | any) => {
        if (canvas.taping === 2) tapeStep_2(canvas);
        else if (canvas.panning === 2) panStep_2(e, canvas);
      },
      "mouse:up": () => {
        if (canvas.taping === 2) tapeStep_3(canvas);
        else if (canvas.panning === 2) panStep_3(canvas);
      },
      "selectgion:created": () => {
        if (canvas.isDrawing) canvas.isDrawingMode = false;
        else if (canvas.panning > 0) canvas.panning = 0;
      },
      "selection:updated": () => {
        if (canvas.isDrawing) canvas.isDrawingMode = false;
        else if (canvas.panning > 0) canvas.panning = 0;
      },
    });

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
