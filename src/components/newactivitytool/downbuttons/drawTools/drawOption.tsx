import Colorbox from "../../common/colorbox/colorbox";
import { DrawOptionContainer } from "./style";
import { CRAYON, ERASER, FELTPEN, ReducersType, SPRAY } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { useEffect, useState } from "react";

export default function DrawOption() {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const { now: select, before } = useSelector(
    (state: ReducersType) => state.drawReducer
  );

  const setColor = async (color: string) => {
    const nowTool = select !== ERASER ? select : before;
    await dispatch(
      drawActions.setBrush({
        ...(brushes as any)[nowTool],
        name: nowTool,
        color: color,
      })
    );
    canvas.freeDrawingBrush.color = color;
  };

  return (
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      <Colorbox
        setColor={(color: string) => {
          setColor(color);
        }}
      />
    </DrawOptionContainer>
  );
}
