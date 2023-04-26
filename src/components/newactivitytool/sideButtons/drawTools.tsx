import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import {
  BACKGROUND_BRUSH,
  DRAWTOOLS,
  ERASER,
  PENCIL,
  ReducersType,
  SPRAY,
} from "../types";
import { Button } from "../styles/indexStyle";
import { fabric } from "fabric-with-erasing";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const isDrawing = useSelector(
    (state: ReducersType) => state.nodeReducer.isDrawing
  );
  const draws = useSelector((state: ReducersType) => state.drawReducer);

  useEffect(() => {
    backgroundPatternMaker();
  }, []);
  useEffect(() => {
    if (canvas) setDrawTools();
  }, [draws, isDrawing]);

  const backgroundPatternMaker = () => {
    const img = new Image();
    img.src = "./diary/pattern.jpg";
    BackgroundBrush.source = img;
  };

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

  const drawToolButtonClick = () => {
    dispatch(categoryActions.categoryChange(DRAWTOOLS));
  };

  return <Button onClick={drawToolButtonClick}>도구</Button>;
}
