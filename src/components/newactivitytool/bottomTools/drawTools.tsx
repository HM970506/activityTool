import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric-with-erasing"; //기존 사용. 모듈xss
import { useCallback, useEffect, useRef, useState } from "react";
import { drawActions } from "../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);
  // const Cryon = new fabric.CrayonBrush(canvas);

  //커스텀 브러쉬 추가1: 패턴 배경 브러쉬
  const img = new Image();
  img.src =
    "https://i.pinimg.com/564x/5a/ad/10/5aad103e59c05d2b7a85c217287fae10.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;
  //커스텀 브러쉬 추가1 끝

  useEffect(() => {
    if (canvas) {
      setTool(draws.tool);
      setSize(draws.size);
      canvas.renderAll();
    }
  }, [draws.tool, draws.size]);

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

  const toolChange = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };
  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  const dispatch = useDispatch();
  return (
    <>
      <BottomButton
        select={draws.tool == "pencil" ? 1 : 0}
        onClick={() => {
          toolChange("pencil");
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        select={draws.tool == "heartPatten" ? 1 : 0}
        onClick={() => {
          toolChange("heartPatten");
        }}
      >
        패턴배경
      </BottomButton>
      <BottomButton
        select={draws.tool == "spray" ? 1 : 0}
        onClick={() => {
          toolChange("spray");
        }}
      >
        스프레이
      </BottomButton>

      <button onClick={() => sizeChange(20)}>큰 브러쉬</button>
      <button onClick={() => sizeChange(3)}>작은 브러쉬</button>

      <BottomButton
        select={draws.tool == "eraser" ? 1 : 0}
        onClick={() => toolChange("eraser")}
      >
        지우개
      </BottomButton>
    </>
  );
}
