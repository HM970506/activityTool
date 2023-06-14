import { useDispatch, useSelector } from "react-redux";
import {
  CRAYON,
  DRAWTOOLS,
  ERASER,
  FELTPEN,
  HIGHLIGHTER,
  ReducersType,
  SPRAY,
} from "../../types";
import { useEffect } from "react";
import DrawOption from "./drawOption";
import { categoryActions } from "../../../../store/common/categorySlice";
import { BottomButton, Tool, ToolBackground, ToolBox } from "./style";
import { getPath } from "./datas";
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

  const ToolButton = ({ keyName }: { keyName: string }) => {
    return (
      <BottomButton
        onClick={() => {
          modalHandler(keyName);
        }}
      >
        {category === DRAWTOOLS && select === keyName && option && (
          <DrawOption keyName={keyName} />
        )}

        <ToolBox select={select === keyName ? 1 : 0}>
          <Tool src={getPath(keyName)} />
          <ToolBackground
            color={
              keyName === FELTPEN || keyName === ERASER
                ? "white"
                : (brushes as any)[keyName].color
            }
          />
        </ToolBox>
      </BottomButton>
    );
  };

  return (
    <>
      <ToolButton keyName={FELTPEN} />
      <ToolButton keyName={CRAYON} />
      <ToolButton keyName={HIGHLIGHTER} />
      <ToolButton keyName={SPRAY} />
      <ToolButton keyName={ERASER} />
    </>
  );
}
