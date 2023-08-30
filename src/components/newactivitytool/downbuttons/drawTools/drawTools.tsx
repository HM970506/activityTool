import { useDispatch, useSelector } from "react-redux";
import {
  CRAYON,
  ERASER,
  FELTPEN,
  HIGHLIGHTER,
  ReducersType,
  SPRAY,
} from "../../types";
import { useEffect } from "react";
import {
  BottomButton,
  Tool,
  ToolBackground,
  ToolBox,
  ToolButtonContainer,
} from "./style";

import { drawActions } from "../../../../store/common/drawSlice";
import { Color, getPath } from "./common";

export default function DrawToolsMenu() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  useEffect(() => {
    if (canvas && select)
      canvas.freeDrawingBrush = (brushes as any)[select].brush;
  }, [select]);

  const ToolButton = ({ nowTool }: { nowTool: string }) => {
    const nowColor = Color(nowTool);
    return (
      <BottomButton
        onClick={() => {
          dispatch(drawActions.setNow(nowTool));
        }}
        className="BottomButton"
      >
        <ToolBox select={select === nowTool ? 1 : 0} className="ToolBox">
          <Tool src={getPath(nowTool)} className="Tool" />
          <ToolBackground
            className="ToolBackground"
            color={
              nowTool === FELTPEN || nowTool === ERASER
                ? "white"
                : (brushes as any)[nowTool].color
            }
          >
            {nowColor}
          </ToolBackground>
        </ToolBox>
      </BottomButton>
    );
  };

  return (
    <ToolButtonContainer id={"DrawToolsMenu"}>
      <ToolButton nowTool={CRAYON} />
      <ToolButton nowTool={HIGHLIGHTER} />
      <ToolButton nowTool={SPRAY} />
      <ToolButton nowTool={ERASER} />
    </ToolButtonContainer>
  );
}
