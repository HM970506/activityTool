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
import { categoryActions } from "../../../../store/common/categorySlice";
import {
  BottomButton,
  Tool,
  ToolBackground,
  ToolBox,
  ToolButtonContainer,
} from "./style";

import { drawActions } from "../../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
  );
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  useEffect(() => {
    if (canvas && select)
      canvas.freeDrawingBrush = (brushes as any)[select].brush;
  }, [select]);

  const modalHandler = (name: string) => {
    if (select !== name) dispatch(drawActions.setNow(name));
    else if (!option) dispatch(categoryActions.optionChange(true));
    else if (select === name && option)
      dispatch(categoryActions.optionChange(false));
  };

  const getPath = (name: string) => {
    return `/drawtools/${name}.png`;
  };

  const ToolButton = ({ nowTool }: { nowTool: string }) => {
    return (
      <BottomButton
        onClick={() => {
          dispatch(drawActions.setNow(nowTool));
        }}
      >
        <ToolBox select={select === nowTool ? 1 : 0}>
          <Tool src={getPath(nowTool)} />
          <ToolBackground
            color={
              nowTool === FELTPEN || nowTool === ERASER
                ? "white"
                : (brushes as any)[nowTool].color
            }
          />
        </ToolBox>
      </BottomButton>
    );
  };

  return (
    <ToolButtonContainer>
      <ToolButton nowTool={CRAYON} />
      <ToolButton nowTool={HIGHLIGHTER} />
      <ToolButton nowTool={SPRAY} />
      <ToolButton nowTool={ERASER} />
    </ToolButtonContainer>
  );
}
