import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { DRAWTOOLS } from "../types";
import { Button } from "../style";
import { fabric } from "fabric-with-erasing";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const setColor = (color: string) => {
    const now = canvas.getActiveObject();
    if (now) now.set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  useEffect(() => {
    if (canvas) {
      setTool(draws.tool);
      setSize(draws.size);
      setColor(draws.color);
      canvas.renderAll();
    }
  }, [draws]);

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);

  //커스텀 브러쉬 추가1: 패턴 배경 브러쉬
  const img = new Image();
  img.src =
    "https://i.pinimg.com/564x/5a/ad/10/5aad103e59c05d2b7a85c217287fae10.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;
  //커스텀 브러쉬 추가1 끝

  const setTool = (tool: string) => {
    if (canvas.__eventListeners) canvas.__eventListeners["mouse:up"] = [];
    if (tool == "pencil") canvas.freeDrawingBrush = PenBrush;
    else if (tool == "heartPatten") canvas.freeDrawingBrush = HeartPatternBrush;
    else if (tool == "spray") canvas.freeDrawingBrush = SprayBrush;
    else if (tool == "eraser") canvas.freeDrawingBrush = Eraser;
  };
  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const iscursorExist = () => {
    let check = false;
    const objects = canvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id == "cursor") {
        check = true;
        break;
      }
    }
    return check;
  };

  useEffect(() => {
    if (canvas) {
      if (draws.isDrawing) {
        if (iscursorExist()) {
          canvas.__eventListeners["mouse:move"].pop();
          canvas.__eventListeners["mouse:out"].pop();
          canvas.__eventListeners["mouse:over"].pop();
          canvas.__eventListeners["mouse:down:before"].pop();

          canvas.getObjects().forEach((object: any) => {
            if (object.id == "cursor") {
              canvas.remove(object);
              canvas.renderAll();
            }
          });
        }

        canvas.isDrawingMode = true;
        canvas.discardActiveObject().renderAll();
        // if (draws.tool == "eraser") {
        //   canvas.freeDrawingCursor = "auto";
        //   return;
        // }
        canvas.freeDrawingCursor = "none";
        const cursor = new fabric.Circle({
          radius: draws.size / 2,
          fill: draws.tool != "eraser" ? draws.color : "rgba(0,0,0,0)",
          stroke: draws.tool != "eraser" ? "none" : "2px solid black",
          left: 0,
          top: 0,
          opacity: 0,
          id: "cursor",
          selectable: false,
          erasable: false,
        });

        canvas.on("mouse:out", () => {
          cursor.opacity = 0;
          canvas.renderAll();
        });
        canvas.on("mouse:over", () => {
          cursor.opacity = 1;
          canvas.renderAll();
        });
        canvas.on("mouse:down:before", () => {
          cursor.opacity = 0;
          canvas.renderAll();
        });
        canvas.on("mouse:move", (e: any) => {
          cursor.opacity = 1;
          const mouse = canvas.getPointer(e);
          cursor.set({
            left: mouse.x - draws.size / 2,
            top: mouse.y - draws.size / 2,
          });
          canvas.renderAll();
        });

        canvas.add(cursor);
        console.log(cursor, canvas.getObjects());
        canvas.renderAll();
      } else {
        canvas.isDrawingMode = false;
        canvas.renderAll();
      }
    }
  }, [draws]);

  const drawToolButtonClick = () => {
    dispatch(categoryActions.categoryChange(DRAWTOOLS));
  };

  return <Button onClick={drawToolButtonClick}>도구</Button>;
}
