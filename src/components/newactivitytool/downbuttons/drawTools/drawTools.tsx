import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../../styles/commonStyle";
import { drawActions } from "../../../../store/common/drawSlice";
import { fabric } from "fabric-with-erasing";
import { DrawSample } from "../../styles/bottomToolstyle";
import {
  BACKGROUND_BRUSH,
  DRAW_SIZE,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
} from "../../types";
import { useEffect } from "react";

export default function DrawToolsMenu() {
  const dispatch = useDispatch();
  const draws = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  const toolChange = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };
  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  const sizeUp = () => {
    sizeChange(draws.size < 100 ? draws.size + DRAW_SIZE : draws.size);
  };

  const sizeDown = () => {
    sizeChange(draws.size > 5 ? draws.size - DRAW_SIZE : draws.size);
  };

  useEffect(() => {
    if (canvas) {
      if (draws.tool === ERASER) canvas.eraserTest = true;
      else canvas.eraserTest = false;
    }
  }, [draws.tool]);

  return (
    <>
      <BottomButton
        select={draws.tool === PENCIL ? 1 : 0}
        onClick={() => {
          toolChange("pencil");
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        select={draws.tool === BACKGROUND_BRUSH ? 1 : 0}
        onClick={() => {
          toolChange(BACKGROUND_BRUSH);
        }}
      >
        패턴배경
      </BottomButton>
      <BottomButton
        select={draws.tool === SPRAY ? 1 : 0}
        onClick={() => {
          toolChange(SPRAY);
        }}
      >
        스프레이
      </BottomButton>

      <BottomButton
        select={draws.tool === ERASER ? 1 : 0}
        onClick={() => toolChange(ERASER)}
      >
        지우개
      </BottomButton>

      <button onClick={sizeUp}>크게!</button>
      <button onClick={sizeDown}>작게!</button>

      <DrawSample size={draws.size} />
    </>
  );
}
