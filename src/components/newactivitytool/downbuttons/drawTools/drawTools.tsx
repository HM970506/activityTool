import { useDispatch, useSelector } from "react-redux";
import {
  BACKGROUND_BRUSH,
  DRAWTOOLS,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
} from "../../types";
import { Dispatch, useEffect } from "react";
import DrawOption from "./drawOption";
import { categoryActions } from "../../../../store/common/categorySlice";
import { BottomButton } from "./style";

export default function DrawToolsMenu({
  select,
  setSelect,
  brushes,
}: {
  select: string;
  brushes: Map<string, any>;
  setSelect: Dispatch<React.SetStateAction<string>>;
}) {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { pencil, back, spray, eraser } = useSelector(
    (state: ReducersType) => state.drawReducer
  );
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
  );

  const optionChange = (name: string, option: any) => {
    const brush = brushes.get(name);
    brush.color = option.color;
    brush.width = option.size;
    if (canvas) canvas.freeDrawingBrush = brush;
    brushes.set(name, brush);
  };

  useEffect(() => {
    optionChange(PENCIL, pencil);
  }, [pencil]);

  useEffect(() => {
    optionChange(BACKGROUND_BRUSH, back);
  }, [back]);

  useEffect(() => {
    optionChange(SPRAY, spray);
  }, [spray]);

  useEffect(() => {
    optionChange(ERASER, eraser);
  }, [eraser]);

  useEffect(() => {
    if (select !== "")
      optionChange(
        select,
        select === PENCIL
          ? pencil
          : select === SPRAY
          ? spray
          : select === ERASER
          ? eraser
          : back
      );
  }, [select]);

  const dispatch = useDispatch();
  const setting = (name: string) => {
    if (select !== name) {
      setSelect(name);
      canvas.freeDrawingBrush = brushes.get(name);
    } else if (!option) dispatch(categoryActions.optionChange(true));
    else if (select === name && option)
      dispatch(categoryActions.optionChange(false));
  };
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  return (
    <>
      <BottomButton
        color={pencil.color}
        select={select === PENCIL ? 1 : 0}
        onClick={() => {
          setting(PENCIL);
        }}
      >
        {category === DRAWTOOLS && select === PENCIL && option && (
          <DrawOption keyName={PENCIL} />
        )}
        <p> 펜</p>
      </BottomButton>

      <BottomButton
        color={back.color}
        select={select === BACKGROUND_BRUSH ? 1 : 0}
        onClick={() => {
          setting(BACKGROUND_BRUSH);
        }}
      >
        패턴배경
        {category === DRAWTOOLS && select === BACKGROUND_BRUSH && option && (
          <DrawOption keyName={BACKGROUND_BRUSH} />
        )}
      </BottomButton>

      <BottomButton
        color={spray.color}
        select={select === SPRAY ? 1 : 0}
        onClick={() => {
          setting(SPRAY);
        }}
      >
        스프레이
        {category === DRAWTOOLS && select === SPRAY && option && (
          <DrawOption keyName={SPRAY} />
        )}
      </BottomButton>

      <BottomButton
        color={eraser.color}
        select={select === ERASER ? 1 : 0}
        onClick={() => {
          setting(ERASER);
        }}
      >
        지우개
        {category === DRAWTOOLS && select === ERASER && option && (
          <DrawOption keyName={ERASER} />
        )}
      </BottomButton>
    </>
  );
}
