import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground } from "../style";
import canvasSetting from "./canvasSetting";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import getData from "../../firestore/getData";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(255,255,255,0)",
      preserveObjectStacking: true,
      freeDrawingCursor: "url(./eraser.svg) 2 2, auto",
      selection: false,
      taping: 0,
      panning: 0,
      stamping: -1,
      skipOffscreen: true,
      allowTouchScrolling: true,
      deltaX: 0,
      deltaY: 0,
      lastClientX: 0,
      lastClientY: 0,
      tapeState: {
        size: 20,
        opacity: 0.5,
      },
      toolColor: "black",
    });
    canvas.freeDrawingBrush.inverted = true;

    fabricSetting();
    windowSetting(dispatch, canvas);

    getData();

    canvas.renderAll();
    dispatch(nodeActions.setCanvas(canvasSetting(canvas)));
    dispatch(nodeActions.setTextareaContainer(containerRef.current));
  }, []);

  return (
    <CanvasBackground ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
