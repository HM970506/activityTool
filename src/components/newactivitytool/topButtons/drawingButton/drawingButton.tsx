import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { Label, Toggle, Slider } from "../style";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { fabric } from "fabric-with-erasing";
import { DRAWTOOLS } from "../../types";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const category = useSelector((state: any) => state.categoryReducer.category);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  useEffect(() => {
    if (category != "DRAWTOOLS") dispatch(nodeActions.setDraw(false));
  }, [category]);

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

  const cursorReset = () => {
    //우선 여기서밖에 해당 이벤트를 사용하는 곳이 없어 이렇게 해놓긴 했지만..
    //만약 다른 곳에서 해당 이벤트를 사용할 경우를 대비하여 함수를 찾아 삭제하는 방법으로 이후수정하기.
    //이벤트 목록에서 해당하는 함수만 슬라이스해주는 함수를 별도로 만듭시다..

    let flag = false;

    canvas.getObjects().forEach((object: any) => {
      if (object.id == "cursor") {
        flag = true;
        canvas.remove(object);
        canvas.renderAll();
      }
    });

    if (flag) {
      canvas.__eventListeners["mouse:move"].pop();
      canvas.__eventListeners["mouse:out"].pop();
      canvas.__eventListeners["mouse:over"].pop();
      canvas.__eventListeners["mouse:down:before"].pop();
    }
  };

  useEffect(() => {
    if (canvas) {
      if (category != DRAWTOOLS || !isDrawing) {
        if (iscursorExist()) cursorReset();
        canvas.isDrawingMode = false;
        canvas.renderAll();
      }
    }
  }, [category, isDrawing]);

  useEffect(() => {
    if (canvas) {
      if (isDrawing) {
        if (iscursorExist()) {
          console.log("커서 있음");
          cursorReset();
        }
        canvas.isDrawingMode = true;
        canvas.discardActiveObject().renderAll();
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
          hoverCursor: "default",
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
        canvas.renderAll();
      }
    }
  }, [isDrawing, draws]);

  return (
    <span>
      <span>그림모드</span>
      <Label>
        <Toggle
          type="checkbox"
          checked={isDrawing}
          onChange={(e: any) => {
            canvas.taping = 0;
            canvas.panning = 0;
            canvas.stamping = -1;
            dispatch(nodeActions.setPan(false));
            dispatch(nodeActions.setDraw(e.target.checked));
          }}
        />
        <Slider></Slider>
      </Label>
    </span>
  );
}
