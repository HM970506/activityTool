import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { DRAWTOOLS } from "../types";
import { Button } from "../style";
import { fabric } from "fabric-with-erasing";

export default function DrawToolsButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const setColor = (color: string) => {
    const now = canvas.getActiveObject();
    if (now) now.set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  const setDrawTools = () => {
    setTool(draws.tool);
    setSize(draws.size);
    setColor(draws.color);
    canvas.toolColor = draws.color;
    canvas.renderAll();
  };

  useEffect(() => {
    if (canvas) setDrawTools();
  }, [draws, isDrawing]);

  const PenBrush = new fabric.PencilBrush(canvas);
  const Pen2Brush = new fabric.Shadow(canvas, { blur: 100 });
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  const Eraser = new fabric.EraserBrush(canvas);

  //커스텀 브러쉬 추가1:  배경 브러쉬
  const img = new Image();
  img.src = "./pattern.jpg";
  //여기 cors error 해결하기
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;
  //커스텀 브러쉬 추가1 끝

  const setTool = (tool: string) => {
    //  if (canvas.__eventListeners) canvas.__eventListeners["mouse:up"] = [];
    if (tool == "pencil") canvas.freeDrawingBrush = PenBrush;
    else if (tool == "heartPatten") canvas.freeDrawingBrush = HeartPatternBrush;
    else if (tool == "spray") canvas.freeDrawingBrush = SprayBrush;
    else if (tool == "eraser") canvas.freeDrawingBrush = Eraser;
    else if (tool == "pencil2") canvas.freeDrawingBrush = Pen2Brush;
  };
  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const drawToolButtonClick = () => {
    dispatch(categoryActions.categoryChange(DRAWTOOLS));
  };

  return <Button onClick={drawToolButtonClick}>도구</Button>;
}
