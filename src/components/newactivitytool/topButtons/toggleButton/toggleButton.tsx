import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { selectActions } from "../../../../store/common/selectSlice";
import { Label, Toggle, Slider } from "./style";

export default function ToggleButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const category = useSelector((state: any) => state.categoryReducer.category);
  const draws = useSelector((state: any) => state.drawReducer);

  useEffect(() => {
    if (category != "DRAWTOOLS") dispatch(drawActions.setDraw(false));
  }, [category]);

  return (
    <Label>
      <Toggle
        type="checkbox"
        checked={draws.isDrawing}
        onChange={(e) => dispatch(drawActions.setDraw(e.target.checked))}
      />
      <Slider></Slider>
    </Label>
  );
}
