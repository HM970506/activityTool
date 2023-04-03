import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { deleteProps } from "../setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground, Textarea } from "../style";
import { zoomActions } from "../../../store/common/zoomSlice";
import canvasSetting from "./canvasSetting";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";

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
      taping: false,
    });
    canvas.freeDrawingBrush.inverted = true;

    fabricSetting();
    windowSetting(dispatch, canvas);

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
