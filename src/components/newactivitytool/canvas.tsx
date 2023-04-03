import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground, Textarea } from "./style";
import { zoomActions } from "../../store/common/zoomSlice";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const DeselctMultipleObjects = (canvas: any) => {
    if (canvas.getActiveObject().type == "activeSelection") {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.selectionBorderColor = "black";
  fabric.Object.prototype.erasable = false;
  fabric.Object.prototype.hoverCursor = "default";
  fabric.Object.prototype.selectable = false;
  fabric.Object.prototype.hasBorders = false;

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(255,255,255,0)",
      preserveObjectStacking: true,
      freeDrawingCursor: "url(./eraser.svg) 2 2, auto",
      selection: false,
    });
    canvas.freeDrawingBrush.inverted = true;
    canvas.renderAll();

    canvas.on({
      "selection:created": () => {
        DeselctMultipleObjects(canvas);
      },
      "selection:updated": () => {
        DeselctMultipleObjects(canvas);
      },
    });

    dispatch(nodeActions.setCanvas(canvas));
    dispatch(nodeActions.setTextareaContainer(containerRef.current));
  }, []);

  const resizeHandler = () => {
    dispatch(nodeActions.setZoom(1));
    if (canvas) {
      const ratio = canvas.getWidth() / canvas.getHeight();
      const containerWidth = window.innerWidth;
      const zoom = containerWidth / canvas.getWidth();
      const scale = canvas.getZoom() * zoom;
      dispatch(nodeActions.setZoom(scale));
      canvas.setDimensions({
        width: containerWidth,
        height: containerWidth / ratio,
      });
      canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
      dispatch(zoomActions.setScale(scale));
      canvas.renderAll();
    }
  };
  window.addEventListener("resize", resizeHandler);

  return (
    <CanvasBackground ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
