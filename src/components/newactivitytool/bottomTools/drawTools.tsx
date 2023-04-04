import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric-with-erasing"; //기존 사용. 모듈xss
import { useCallback, useEffect, useRef, useState } from "react";
import { drawActions } from "../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  // const Cryon = new fabric.CrayonBrush(canvas);

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
        select={draws.tool == "pencil2" ? 1 : 0}
        onClick={() => {
          toolChange("pencil2");
        }}
      >
        펜2
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
