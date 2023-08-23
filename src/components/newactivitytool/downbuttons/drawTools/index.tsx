import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { CRAYON, DRAWTOOLS, ReducersType } from "../../types";
import { ToolsContatiner } from "./style";
import DrawToolsMenu from "./drawTools";
import DrawOption from "./drawOption";
import { Button } from "../../style";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  useEffect(() => {
    if (select !== "" && canvas) canvas.isDrawingMode = true;
  }, [select]);

  const openHandler = () => {
    if (category !== DRAWTOOLS)
      dispatch(categoryActions.categoryChange(DRAWTOOLS));
    else dispatch(categoryActions.categoryChange(""));
  };

  return (
    <ToolsContatiner>
      <Button>체크</Button>
      {canvas && (
        <>
          <DrawToolsMenu />
          <DrawOption />
        </>
      )}
    </ToolsContatiner>
  );
}
