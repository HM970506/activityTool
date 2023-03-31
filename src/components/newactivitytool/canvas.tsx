import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../store/common/nodeSlice";
import { deleteProps } from "./setting/deleteButton";
import { useEffect, useRef, useState } from "react";
import { Background, CanvasBackground, Textarea } from "./style";
import zoomSlice, { zoomActions } from "../../store/common/zoomSlice";
import { saveJson } from "./topButtons/saveButton/save";
import { modifyProps } from "./setting/modifyButton";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textareaResize = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

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
      freeDrawingCursor: "url(./eraser.svg) 2 2, auto",
    });
    canvas.freeDrawingBrush.inverted = true;

    //오브젝트 기본세팅

    fabric.Object.prototype.cornerColor = "black";
    fabric.Object.prototype.selectionBorderColor = "black";
    fabric.Object.prototype.erasable = true;
    fabric.Object.prototype.selectable = false;
    fabric.Object.prototype.hasBorders = false;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      ...deleteProps,
    });

    fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
      ...deleteProps,
    });
    const modifyObject = (e: any, transform: any) => {
      const target = transform.target;
      dispatch(nodeActions.setTextbox(target));
    };

    fabric.Textbox.prototype.controls.modifyControl = new fabric.Control({
      ...modifyProps,
      mouseUpHandler: modifyObject,
    });

    //오브젝트 기본세팅 끝

    canvas.on({
      "selection:created": () => {
        DeselctMultipleObjects(canvas);
      },
      "selection:updated": () => {
        DeselctMultipleObjects(canvas);
      },
      // "mouse:down": () => {
      //   console.log(canvas.getPointer());
      // },
      // "event:dragenter": () => {
      //   console.log("dragenter");
      // },
      // "event:dragleave": () => {
      //   console.log("dragleave");
      // },
    });

    dispatch(nodeActions.setCanvas(canvas));
    dispatch(nodeActions.setTextarea(textAreaRef));
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

  const draws = useSelector((state: any) => state.drawReducer); //펜 관리
  useEffect(() => {
    console.log(draws);
  }, [draws]);

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
