import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground, Textarea } from "./style";
import { zoomActions } from "../../store/common/zoomSlice";
import { saveJson } from "./topButtons/saveButton/save";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  //오브젝트 기본세팅

  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.editingBorderColor = "black";
  fabric.Object.prototype.erasable = true;
  fabric.Object.prototype.selectable = false;
  fabric.Object.prototype.hasBorders = false;

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
  });

  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    ...deleteProps,
    y: -1,
  });

  //오브젝트 기본세팅 끝

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(255,255,255,0)",
      preserveObjectStacking: true,
    });
    console.log(canvas);
    canvas.freeDrawingBrush.inverted = true;

    dispatch(nodeActions.setCanvas(canvas));

    dispatch(nodeActions.setTextarea(textAreaRef));
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const zoom = useSelector((state: any) => state.zoomReducer.zoom);
  const opacity = useSelector((state: any) => state.zoomReducer.opacity);

  const resizeHandler = () => {
    dispatch(nodeActions.setZoom(1));
    const outerCanvasContainer = containerRef.current;
    if (outerCanvasContainer && canvas) {
      const ratio = canvas.getWidth() / canvas.getHeight();
      const containerWidth = outerCanvasContainer.clientWidth;
      const containerHeight = outerCanvasContainer.clientHeight;

      const scale = containerWidth / canvas.getWidth();
      const zoom = canvas.getZoom() * scale;
      canvas.setDimensions({
        width: containerWidth,
        height: containerWidth / ratio,
      });
      canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      canvas.renderAll();
    }
  };

  const urlHandler = () => {
    console.log("url바꿈");
    saveJson(canvas);
    dispatch(nodeActions.setOpacity(255));
    dispatch(nodeActions.setZoom(1));
    canvas.clear();
  };

  window.addEventListener("resize", resizeHandler);
  window.addEventListener("locationchange", urlHandler);

  return (
    <CanvasBackground ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
      <Textarea
        ref={textAreaRef}
        defaultValue={"텍스트를 입력하세요"}
        onChange={resize}
      />
    </CanvasBackground>
  );
}
