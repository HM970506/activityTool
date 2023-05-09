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
  drawType,
} from "../../types";
import { ToolNow, ToolNowBox, ToolsContatiner } from "./style";
import { fabric } from "fabric-with-erasing";
import DrawToolsMenu from "./drawTools";
import DrawOption from "./drawOption";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<number>(0);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const [select, setSelect] = useState<drawType>({
    tool: "",
    color: "black",
    size: 5,
  }); //현재 선택된 펜 상태

  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  useEffect(() => {
    if (category === DRAWTOOLS) setIsOpen(1);
    else setIsOpen(0);
  }, [category]);

  useEffect(() => {
    setDrawTools();
  }, [select]);

  const setColor = (color: string) => {
    const now = canvas.getActiveObject();
    if (now) now.set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const setDrawTools = () => {
    setTool(select.tool);
    setSize(select.size);
    setColor(select.color);
    canvas.toolColor = select.color;
    canvas.renderAll();
  };

  const setTool = (tool: string) => {
    if (tool === PENCIL) {
      canvas.freeDrawingBrush = PenBrush;
    } else if (tool === BACKGROUND_BRUSH) {
      canvas.freeDrawingBrush = BackgroundBrush;
    } else if (tool === SPRAY) {
      canvas.freeDrawingBrush = SprayBrush;
    } else if (tool === ERASER) {
      canvas.freeDrawingBrush = Eraser;
    }
  };
  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);
  const BackgroundBrush = new fabric.PatternBrush(canvas);

  const img = new Image();
  img.src = "/diary/pattern.jpg";
  img.crossOrigin = "Anonymous";
  BackgroundBrush.source = img;

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
          <p>{select.tool}</p>
        </ToolNow>
      </ToolNowBox>
      <DrawOption />
      {isOpen ? <DrawToolsMenu setSelect={setSelect} select={select} /> : null}
    </ToolsContatiner>
  );
}
