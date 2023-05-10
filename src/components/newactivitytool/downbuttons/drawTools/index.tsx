import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import {
  BACKGROUND_BRUSH,
  DRAWTOOLS,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
} from "../../types";
import { ToolNow, ToolNowBox, ToolsContatiner } from "./style";
import { fabric } from "fabric-with-erasing";
import DrawToolsMenu from "./drawTools";

export default function DrawToolsButton() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const BRUSHES = new Map([
    [PENCIL, new fabric.PencilBrush(canvas)],
    [SPRAY, new fabric.SprayBrush(canvas, { density: 1 })],
    [ERASER, new fabric.EraserBrush(canvas)],
    [BACKGROUND_BRUSH, new fabric.PatternBrush(canvas)],
  ]);
  const img = new Image();
  img.src = "/diary/pattern.jpg";
  img.crossOrigin = "Anonymous";
  BRUSHES.get(BACKGROUND_BRUSH).source = img;

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const [select, setSelect] = useState<string>("");
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (category === DRAWTOOLS) setIsOpen(1);
    else setIsOpen(0);
  }, [category]);

  const drawToolStart = () => {
    if (category !== DRAWTOOLS) {
      dispatch(categoryActions.categoryChange(DRAWTOOLS));
      canvas.isDrawingMode = true;
    }
  };

  const drawToolsEnd = () => {
    if (category === DRAWTOOLS) {
      dispatch(categoryActions.categoryChange(""));
      canvas.isDrawingMode = false;
    }
  };

  return (
    <ToolsContatiner onClick={drawToolStart} state={isOpen}>
      <ToolNowBox onClick={drawToolsEnd} state={isOpen}>
        <ToolNow state={isOpen}>
          <p>{select}</p>
        </ToolNow>
      </ToolNowBox>
      {isOpen ? (
        <DrawToolsMenu
          setSelect={setSelect}
          select={select}
          brushes={BRUSHES}
        />
      ) : null}
    </ToolsContatiner>
  );
}
