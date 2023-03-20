import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  // const Eraser = new fabric.EraserBrush(canvas);
  //커스텀 브러쉬 추가1
  const img = new Image();
  img.src = "./pattern.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;

  const toolChagne = (tool: string) => {
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

  //버튼을 클릭할 때마다 전역상태가 바뀌고,
  //전역 상태가 바뀔 때마다 거기에 맞춰 캔버스정보의 모든 값이 바뀌게 월욜에 수정합시다..

  return (
    <>
      <BottomButton
        onClick={() => {
          toolChagne("pen");
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne("heartPatten");
        }}
      >
        하트패턴
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne("spray");
        }}
      >
        스프레이
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne("tape");
        }}
      >
        테이프
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChagne("stamp");
        }}
      >
        도장
      </BottomButton>

      <BottomButton onClick={() => colorChange("black")}>검은색</BottomButton>
      <BottomButton onClick={() => colorChange("blue")}>파란색</BottomButton>
      <BottomButton onClick={() => sizeChange(20)}>큰 브러쉬</BottomButton>
      <BottomButton onClick={() => sizeChange(3)}>작은 브러쉬</BottomButton>
      <BottomButton onClick={() => toolChagne("ERASER")}>지우개</BottomButton>
    </>
  );
}
