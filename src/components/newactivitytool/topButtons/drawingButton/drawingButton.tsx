import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { Label, Toggle, Slider } from "../style";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { fabric } from "fabric-with-erasing";
import { DRAWTOOLS } from "../../types";
import { functionRemover } from "../../commonFunction";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const category = useSelector((state: any) => state.categoryReducer.category);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const cursorRemove = () => {
    canvas.getObjects().forEach((object: any) => {
      if (object.id == "cursor") {
        canvas.remove(object);
        canvas.renderAll();
      }
    });
  };

  const cursorMaker = () => {
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

    const cursorOut = () => {
      cursor.opacity = 0;
      canvas.renderAll();
    };

    const cursorOver = () => {
      cursor.opacity = 1;
      canvas.renderAll();
    };

    const cursorDown = () => {
      cursor.opacity = 0;
      canvas.renderAll();
    };

    const cursorMove = (e: any) => {
      cursor.opacity = 1;
      const mouse = canvas.getPointer(e);
      cursor.set({
        left: mouse.x - draws.size / 2,
        top: mouse.y - draws.size / 2,
      });
      canvas.renderAll();
    };

    canvas.on({
      "mouse:out": cursorOut,
      "mouse:over": cursorOver,
      "mouse:down:before": cursorDown,
      "mouse:move": cursorMove,
    });

    canvas.add(cursor);
    canvas.renderAll();
  };

  const drawOn = () => {
    //1.커서 바꾸고
    // cursorMaker();

    //2.캔버스 설정 바꾸고
    canvas.isDrawingMode = true;

    //3.드로우는 켜고 나머지 설정들 끄고
    dispatch(nodeActions.setPan(false));

    //5.함수 추가하고
    canvas.on({ "selection:created": drawOff, "selection:updated": drawOff });

    //6.렌더링
    canvas.discardActiveObject().renderAll();
  };

  const drawOff = () => {
    //1.커서 바꾸고
    cursorRemove();
    canvas.defaultCursor = "default";

    //3.캔버스 설정 바꾸고
    canvas.isDrawingMode = false;

    //4.드로우 끄고
    if (isDrawing) dispatch(nodeActions.setDraw(false));

    //5.함수 삭제하고
    canvas.__eventListeners["mouse:out"] = functionRemover(
      canvas.__eventListeners["mouse:out"],
      "cursorOut"
    );
    canvas.__eventListeners["mouse:over"] = functionRemover(
      canvas.__eventListeners["mouse:over"],
      "cursorOver"
    );
    canvas.__eventListeners["mouse:down:before"] = functionRemover(
      canvas.__eventListeners["mouse:down:before"],
      "cursorDown"
    );
    canvas.__eventListeners["mouse:move"] = functionRemover(
      canvas.__eventListeners["mouse:move"],
      "cursorMove"
    );
    canvas.__eventListeners["selection:created"] = functionRemover(
      canvas.__eventListeners["selection:created"],
      "drawOff"
    );
  };

  useEffect(() => {
    if (canvas) {
      if (isDrawing) drawOn();
      else drawOff();
    }
  }, [isDrawing]);

  const drawHandler = (e: any) => {
    dispatch(nodeActions.setDraw(e.target.checked));
  };

  return (
    <span>
      <span>그림모드</span>
      <Label>
        <Toggle type="checkbox" checked={isDrawing} onChange={drawHandler} />
        <Slider></Slider>
      </Label>
    </span>
  );
}
