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

  // const isCursorExist = () => {
  //   let check = false;
  //   const objects = canvas.getObjects();
  //   for (let i = 0; i < objects.length; i++) {
  //     if (objects[i].id == "cursor") {
  //       check = true;
  //       break;
  //     }
  //   }
  //   return check;
  // };

  useEffect(() => {
    if (canvas) {
      if (draws.isDrawing) {
        canvas.discardActiveObject().renderAll();
        canvas.isDrawingMode = true;

        // fabric.Image.fromURL(`./${draws.tool}.png`, (cursor: any) => {
        //   cursor.selectable = false;
        //   cursor.scaleX = 0.5;
        //   cursor.scaleY = 0.5;
        //   cursor.top = -100;
        //   cursor.left = -100;
        //   cursor.id = "cursor";

        //   canvas.on("mouse:out", () => {
        //     cursor.opacity = 0;
        //     canvas.renderAll();
        //   });
        //   canvas.on("mouse:over", () => {
        //     cursor.opacity = 1;
        //     canvas.renderAll();
        //   });

        //   canvas.on("object:selected", (e: any) => {
        //     e.target.selectable = false;
        //     return false;
        //   });

        //   canvas.on("mouse:move", (e: any) => {
        //     const mouse = canvas.getPointer(e);
        //     cursor.set({
        //       left: mouse.x + 10,
        //       top: mouse.y - 100,
        //     });
        //     canvas.renderAll();
        //   });

        //   canvas.add(cursor);
        //   canvas.renderAll();
        // });
      } else {
        canvas.isDrawingMode = false;
        canvas.renderAll();

        // if (isCursorExist()) {
        //   canvas.__eventListeners["object:selected"].pop();
        //   canvas.__eventListeners["mouse:move"].pop();
        //   canvas.__eventListeners["mouse:out"].pop();
        //   canvas.__eventListeners["mouse:over"].pop();

        //   canvas.getObjects().forEach((object: any) => {
        //     if (object.id == "cursor") canvas.remove(object);
        //   });
        // }
      }
    }
  }, [draws.isDrawing, draws.tool]);

  const drawToolButtonClick = () => {
    dispatch(categoryActions.categoryChange(DRAWTOOLS));
  };

  return <Button onClick={drawToolButtonClick}>도구</Button>;
}
