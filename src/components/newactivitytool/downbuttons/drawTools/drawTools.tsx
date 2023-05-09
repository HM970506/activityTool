import { useSelector } from "react-redux";
import { BottomButton } from "../../styles/commonStyle";
import {
  BACKGROUND_BRUSH,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
  drawType,
} from "../../types";
import { Dispatch, SetStateAction, useState } from "react";

const DEFAULT = {
  pen: { tool: "pen", color: "black", size: 5 },
  pencil: { tool: PENCIL, color: "black", size: 5 },
  magic: { tool: BACKGROUND_BRUSH, color: "black", size: 5 },
  spray: { tool: SPRAY, color: "black", size: 5 },
  eraser: { tool: ERASER, color: "black", size: 5 },
};

export default function DrawToolsMenu({
  select,
  setSelect,
}: {
  select: drawType;
  setSelect: Function;
}) {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const [options, setOptions] = useState(DEFAULT); //옵션들. 이중에서 셀렉트가 결정됨

  const toolChange = (select: {
    tool: string;
    size: number;
    color: string;
  }) => {
    setSelect(select);
  };

  return (
    <>
      <BottomButton
        select={select.tool === PENCIL ? 1 : 0}
        onClick={() => {
          toolChange(options.pencil);
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        select={select.tool === BACKGROUND_BRUSH ? 1 : 0}
        onClick={() => {
          toolChange(options.magic);
        }}
      >
        패턴배경
      </BottomButton>
      <BottomButton
        select={select.tool === SPRAY ? 1 : 0}
        onClick={() => {
          toolChange(options.spray);
        }}
      >
        스프레이
      </BottomButton>

      <BottomButton
        select={select.tool === ERASER ? 1 : 0}
        onClick={() => toolChange(options.eraser)}
      >
        지우개
      </BottomButton>
    </>
  );
}
