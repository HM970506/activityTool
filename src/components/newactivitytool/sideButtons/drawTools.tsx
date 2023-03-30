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
