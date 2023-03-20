import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric";
import { useEffect } from "react";
import { drawActions } from "../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  // const Eraser = new fabric.EraserBrush(canvas);
  //커스텀 브러쉬 추가1
  const img = new Image();
  img.src = "./pattern.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;

  const toolChange = (tool: string) => {
    if (tool == "pen") canvas.freeDrawingBrush = PenBrush;
    else if (tool == "heartPatten") canvas.freeDrawingBrush = HeartPatternBrush;
    else if (tool == "spray") canvas.freeDrawingBrush = SprayBrush;
    else if (tool == "tape") {
    } else if (tool == "stamp") {
      canvas.isDrawingMode = false;

      fabric.loadSVGFromURL("./stamp.svg", (stamp: any) => {
        const pointer = canvas.getPointer();
        console.log(pointer);
        stamp.top = pointer.x;
        stamp.lefy = pointer.y;
        canvas.add(stamp);
      });

      canvas.isDrawingMode = true;
    } else if (tool == "eraser") {
    }
    // canvas.freeDrawingBrush = Eraser;
  };

  const sizeChange = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const colorChange = (color: string) => {
    if (canvas.getActiveObject()) canvas.getActiveObject().set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  useEffect(() => {
    if (canvas) {
      toolChange(draws.tool);
      sizeChange(draws.size);
      colorChange(draws.color);
    }
  }, [draws]);

  const dispatch = useDispatch();
  return (
    <>
      <BottomButton
        onClick={() => {
          dispatch(drawActions.toolChange("pen"));
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        onClick={() => {
          dispatch(drawActions.toolChange("heartPatten"));
        }}
      >
        하트패턴
      </BottomButton>
      <BottomButton
        onClick={() => {
          dispatch(drawActions.toolChange("spray"));
        }}
      >
        스프레이
      </BottomButton>
      <BottomButton
        onClick={() => {
          dispatch(drawActions.toolChange("tape"));
        }}
      >
        테이프
      </BottomButton>
      <BottomButton
        onClick={() => {
          dispatch(drawActions.toolChange("stamp"));
        }}
      >
        도장
      </BottomButton>

      <BottomButton onClick={() => dispatch(drawActions.colorChange("black"))}>
        검은색
      </BottomButton>
      <BottomButton onClick={() => dispatch(drawActions.colorChange("blue"))}>
        파란색
      </BottomButton>
      <BottomButton onClick={() => dispatch(drawActions.sizeChange(20))}>
        큰 브러쉬
      </BottomButton>
      <BottomButton onClick={() => dispatch(drawActions.sizeChange(3))}>
        작은 브러쉬
      </BottomButton>
      <BottomButton onClick={() => dispatch(drawActions.toolChange("ERASER"))}>
        지우개
      </BottomButton>
    </>
  );
}
