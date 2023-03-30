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

  const textareaResize = (e: any) => {
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

  const containerRef = useRef<HTMLDivElement>(null);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const DeselctMultipleObjects = (canvas: any) => {
    if (canvas.getActiveObject().type == "activeSelection") {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "rgba(255,255,255,0)",
      preserveObjectStacking: true,
    });
    canvas.freeDrawingBrush.inverted = true;

    canvas.on({
      "selection:created": () => {
        DeselctMultipleObjects(canvas);
      },
      "selection:updated": () => {
        DeselctMultipleObjects(canvas);
      },
      "event:dragover": () => {
        console.log("dragover");
      },
      "event:dragenter": () => {
        console.log("dragenter");
      },
      "event:dragleave": () => {
        console.log("dragleave");
      },
    });

    dispatch(nodeActions.setCanvas(canvas));
    dispatch(nodeActions.setTextarea(textAreaRef));
  }, []);

  const resizeHandler = () => {
    dispatch(nodeActions.setZoom(1));
    const outerCanvasContainer = containerRef.current;
    if (outerCanvasContainer && canvas) {
      const ratio = canvas.getWidth() / canvas.getHeight();

      const containerWidth = outerCanvasContainer.clientWidth;
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
      <Textarea
        ref={textAreaRef}
        defaultValue={"텍스트를 입력하세요"}
        onChange={textareaResize}
      />
    </CanvasBackground>
  );
}
