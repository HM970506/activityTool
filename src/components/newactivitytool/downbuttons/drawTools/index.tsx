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
import { useSpring } from "react-spring";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const BRUSHES = new Map([
    [PENCIL, new fabric.PencilBrush(canvas)],
    [SPRAY, new fabric.SprayBrush(canvas, { density: 1 })],
    [ERASER, new fabric.EraserBrush(canvas)],
    [BACKGROUND_BRUSH, new fabric.PatternBrush(canvas)],
  ]);
  const img = new Image();
  img.src = "/diary/DRAWTOOLS/pattern.jpg";
  img.crossOrigin = "Anonymous";
  BRUSHES.get(BACKGROUND_BRUSH).source = img;

  const [isOpen, setIsOpen] = useState<number>(0);
  const [select, setSelect] = useState<string>("");

  useEffect(() => {
    if (canvas) {
      if (category === DRAWTOOLS) {
        setIsOpen(1);
        canvas.isDrawingMode = true;
      } else {
        setIsOpen(0);
        canvas.isDrawingMode = false;
      }
    }
  }, [category]);

  useEffect(() => {
    if (select !== "") canvas.isDrawingMode = true;
  }, [select]);

  const openHandler = () => {
    if (category !== DRAWTOOLS)
      dispatch(categoryActions.categoryChange(DRAWTOOLS));
    else dispatch(categoryActions.categoryChange(""));
  };

  const innerBox = useSpring({
    from: isOpen
      ? {
          width: 32,
          height: 32,
          borderRadius: 16,
          margin: 17,
        }
      : { width: 64, height: 64, borderRadius: 28, margin: 4 },
    to: isOpen
      ? { width: 64, height: 64, borderRadius: 28, margin: 4 }
      : {
          width: 32,
          height: 32,
          borderRadius: 16,
          margin: 17,
        },
  });

  const outterBox = useSpring({
    from: isOpen ? { width: 72 } : { width: 420 },
    to: isOpen ? { width: 420 } : { width: 72 },
  });

  return (
    <ToolsContatiner style={outterBox}>
      <ToolNowBox onClick={openHandler}>
        <ToolNow style={innerBox}>
          <p>{select}</p>
        </ToolNow>
      </ToolNowBox>
      {canvas && (
        <DrawToolsMenu
          setSelect={setSelect}
          select={select}
          brushes={BRUSHES}
        />
      )}
    </ToolsContatiner>
  );
}
