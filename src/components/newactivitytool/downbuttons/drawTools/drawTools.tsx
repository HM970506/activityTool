import { useDispatch, useSelector } from "react-redux";
import {
  BACKGROUND_BRUSH,
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
  const { feltpen, crayon, backgroundBrush, highlighter, spray, eraser } =
    brushes;
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

  return (
    <>
      <BottomButton
        onClick={() => {
          modalHandler(FELTPEN);
        }}
      >
        {category === DRAWTOOLS && select === FELTPEN && option && (
          <DrawOption keyName={FELTPEN} />
        )}

        <ToolBox select={select === FELTPEN ? 1 : 0}>
          <Tool src={getPath("feltpen")} />
          <ToolBackground color={feltpen ? feltpen.color : "red"} />
        </ToolBox>
      </BottomButton>

      <BottomButton
        onClick={() => {
          modalHandler(CRAYON);
        }}
      >
        {category === DRAWTOOLS && select === CRAYON && option && (
          <DrawOption keyName={CRAYON} />
        )}
        <ToolBox select={select === CRAYON ? 1 : 0}>
          <Tool src={getPath("crayon")} />
          <ToolBackground color={crayon ? crayon.color : "red"} />
        </ToolBox>
      </BottomButton>

      <BottomButton
        onClick={() => {
          modalHandler(HIGHLIGHTER);
        }}
      >
        {category === DRAWTOOLS && select === HIGHLIGHTER && option && (
          <DrawOption keyName={HIGHLIGHTER} />
        )}
        <ToolBox select={select === HIGHLIGHTER ? 1 : 0}>
          <Tool src={getPath(HIGHLIGHTER)} />
          <ToolBackground color={highlighter ? highlighter.color : "red"} />
        </ToolBox>
      </BottomButton>

      <BottomButton
        onClick={() => {
          modalHandler(SPRAY);
        }}
      >
        {category === DRAWTOOLS && select === SPRAY && option && (
          <DrawOption keyName={SPRAY} />
        )}
        <ToolBox select={select === SPRAY ? 1 : 0}>
          <Tool src={getPath("spray")} />
          <ToolBackground color={spray ? spray.color : "red"} />
        </ToolBox>
      </BottomButton>

      <BottomButton
        onClick={() => {
          modalHandler(ERASER);
        }}
      >
        {category === DRAWTOOLS && select === ERASER && option && (
          <DrawOption keyName={ERASER} />
        )}
        <ToolBox select={select === ERASER ? 1 : 0}>
          <Tool src={getPath("eraser")} />
          <ToolBackground color={""} />
        </ToolBox>
      </BottomButton>
    </>
  );
}
