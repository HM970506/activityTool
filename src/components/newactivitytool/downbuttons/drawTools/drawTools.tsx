import { useSelector } from "react-redux";
import { BottomButton } from "../../styles/commonStyle";
import { fabric } from "fabric-with-erasing";
import {
  BACKGROUND_BRUSH,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
  drawType,
} from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import DrawOption from "./drawOption";
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
  select: string;
  setSelect: Dispatch<React.SetStateAction<string>>;
}) {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);
  const BackgroundBrush = new fabric.PatternBrush(canvas);

  const img = new Image();
  img.src = "/diary/pattern.jpg";
  img.crossOrigin = "Anonymous";
  BackgroundBrush.source = img;

  const reset = () => {
    setSelect("");
    canvas.isDrawingMode = false;
  };

  return (
    <>
      <BottomButton
        select={select === PENCIL ? 1 : 0}
        onClick={() => {
          if (select !== PENCIL) {
            canvas.isDrawingMode = true;
            setSelect(PENCIL);
            canvas.freeDrawingBrush = PenBrush;
          } else reset();
        }}
      >
        {select === PENCIL && <DrawOption keyName={PENCIL} />}
        <p> 펜</p>
      </BottomButton>

      <BottomButton
        select={select === BACKGROUND_BRUSH ? 1 : 0}
        onClick={() => {
          if (select !== BACKGROUND_BRUSH) {
            canvas.isDrawingMode = true;
            setSelect(BACKGROUND_BRUSH);
            canvas.freeDrawingBrush = BackgroundBrush;
          } else reset();
        }}
      >
        패턴배경
        {select === BACKGROUND_BRUSH && (
          <DrawOption keyName={BACKGROUND_BRUSH} />
        )}
      </BottomButton>

      <BottomButton
        select={select === SPRAY ? 1 : 0}
        onClick={() => {
          if (select !== SPRAY) {
            canvas.isDrawingMode = true;
            setSelect(SPRAY);
            canvas.freeDrawingBrush = SprayBrush;
          } else reset();
        }}
      >
        스프레이
        {select === SPRAY && <DrawOption keyName={SPRAY} />}
      </BottomButton>

      <BottomButton
        select={select === ERASER ? 1 : 0}
        onClick={() => {
          if (select !== ERASER) {
            canvas.isDrawingMode = true;
            setSelect(ERASER);
            canvas.freeDrawingBrush = Eraser;
          } else reset();
        }}
      >
        지우개
        {select === ERASER && <DrawOption keyName={ERASER} />}
      </BottomButton>
    </>
  );
}
