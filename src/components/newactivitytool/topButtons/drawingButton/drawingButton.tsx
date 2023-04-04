import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { Label, Toggle, Slider } from "../style";
import { nodeActions } from "../../../../store/common/nodeSlice";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const category = useSelector((state: any) => state.categoryReducer.category);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);

  useEffect(() => {
    if (category != "DRAWTOOLS") dispatch(nodeActions.setDraw(false));
  }, [category]);

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
            dispatch(nodeActions.setDraw(e.target.checked));
          }}
        />
        <Slider></Slider>
      </Label>
    </span>
  );
}
