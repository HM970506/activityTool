import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { CRAYON, DRAWTOOLS, ReducersType } from "../../types";
import { ToolsContatiner } from "./style";
import DrawToolsMenu from "./drawTools";
import DrawOption from "./drawOption";
import { Button } from "../../style";

export default function DrawToolsButton() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  useEffect(() => {
    if (select !== "" && canvas) canvas.isDrawingMode = true;
  }, [select]);

  return (
    <ToolsContatiner id={"ToolsContatiner"}>
      <Button id={"Button"}>체크</Button>
      {canvas && (
        <>
          <DrawToolsMenu />
          <DrawOption />
        </>
      )}
    </ToolsContatiner>
  );
}
