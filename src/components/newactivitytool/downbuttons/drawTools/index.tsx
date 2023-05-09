import { useEffect } from "react";
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

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const draws = useSelector((state: ReducersType) => state.drawReducer);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (canvas) setDrawTools();
  }, [draws]);

  const setColor = (color: string) => {
    const now = canvas.getActiveObject();
    if (now) now.set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const setDrawTools = () => {
    setTool(draws.tool);
    setSize(draws.size);
    setColor(draws.color);
    canvas.toolColor = draws.color;
    canvas.renderAll();
  };
  const setTool = (tool: string) => {
    if (tool === PENCIL) canvas.freeDrawingBrush = PenBrush;
    else if (tool === BACKGROUND_BRUSH)
      canvas.freeDrawingBrush = BackgroundBrush;
    else if (tool === SPRAY) canvas.freeDrawingBrush = SprayBrush;
    else if (tool === ERASER) canvas.freeDrawingBrush = Eraser;
  };
  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);
  const BackgroundBrush = new fabric.PatternBrush(canvas);

  const img = new Image();
  img.src = "/diary/pattern.jpg";
  img.crossOrigin = "Anonymous";
  BackgroundBrush.source = img;

  return (
    <ToolsContatiner
      onClick={() => {
        if (category !== DRAWTOOLS)
          dispatch(categoryActions.categoryChange(DRAWTOOLS));
      }}
      state={category === DRAWTOOLS ? 1 : 0}
    >
      <ToolNowBox
        state={category === DRAWTOOLS ? 1 : 0}
        onClick={() => {
          if (category === DRAWTOOLS)
            dispatch(categoryActions.categoryChange(""));
        }}
      >
        <ToolNow color={draws.color} state={category === DRAWTOOLS ? 1 : 0}>
          <p>test</p>
        </ToolNow>
      </ToolNowBox>
    </ToolsContatiner>
  );
}
