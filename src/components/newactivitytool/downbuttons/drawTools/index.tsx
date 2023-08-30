import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReducersType } from "../../types";
import { ButtonInner, ToolsContatiner } from "./style";
import DrawToolsMenu from "./drawTools";
import DrawOption from "./drawOption";
import { Button } from "../../style";
import { ReactComponent as CHECK } from "./svg/check.svg";

export default function DrawToolsButton() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  useEffect(() => {
    if (select !== "" && canvas) canvas.isDrawingMode = true;
  }, [select]);

  return (
    <ToolsContatiner id={"ToolsContatiner"}>
      <Button id={"Button"}>
        <ButtonInner>
          <CHECK />
        </ButtonInner>
      </Button>
      {canvas && (
        <>
          <DrawToolsMenu />
          <DrawOption />
        </>
      )}
    </ToolsContatiner>
  );
}
