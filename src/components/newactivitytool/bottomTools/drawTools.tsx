import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric"; //기존 사용. 모듈x

import { useEffect, useState } from "react";
import { drawActions } from "../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  //근데 이럴거면 리덕스가 아니라 그냥 useState를 써도 되지 않아?🤔 펜은 여기서밖에 안 쓰니까..
  //혹시 모르니까 우선 리덕스로 하고.. 끝까지 도구를 사용하는 곳이 없으면 여기에 useReducer로 다시 정리하자

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  // const Eraser = new fabric.EraserBrush(canvas);

  //커스텀 브러쉬 추가1: 패턴 배경 브러쉬
  const img = new Image();
  img.src = "./pattern.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;
  //커스텀 브러쉬 추가1 끝

  //커스텀 브러쉬 추가2: 스탬프 브러쉬
  //카테고리가 변하면 그림기능 off되게 하는 거 추가하기~

  const makeStampe = (stamp: string) => {
    //if (draws.isDrawing) {
    canvas.selection = false;
    canvas.isDrawingMode = false;
    console.log(canvas.isDrawingMode);

    fabric.Image.fromURL(`./stampGripHand.png`, (cursor: any) => {
      cursor.scaleX = 0.5;
      cursor.scaleY = 0.5;
      console.log(cursor);

      //캔버스 안에서는 커서 대신 도장이 보이게 하는 함수
      canvas.wrapperEl.addEventListener("mouseleave", () => {
        canvas.remove(cursor);
      });
      canvas.wrapperEl.addEventListener("mouseenter", () => {
        canvas.add(cursor);
      });

      canvas.on("object:selected", (evt: any) => {
        evt.target.selectable = false;
        return false;
      });
      canvas.on("mouse:move", (e: any) => {
        cursor.set({
          left: e.e.layerX - 50,
          top: e.e.layerY - 300,
        });
        canvas.renderAll();
      });

      canvas.on("mouse:up", (e: any) => {
        const coord = canvas.getPointer(e.target);
        console.log(coord);
        cursor.set({
          left: e.e.layerX - 50,
          top: e.e.layerY - 250,
        });
        fabric.loadSVGFromUrl("./stamp.svg", (objects: any, options: any) => {
          canvas.add(fabric.util.groupSVGElements(objects, options));
          canvas.calcOffset();
          canvas.renderAll();
        });
      });
    });
    //}
  };

  //커스텀 브러쉬 추가2끝

  const setTool = (tool: string) => {
    if (tool == "pen") canvas.freeDrawingBrush = PenBrush;
    else if (tool == "heartPatten") canvas.freeDrawingBrush = HeartPatternBrush;
    else if (tool == "spray") canvas.freeDrawingBrush = SprayBrush;
    else if (tool == "tape") {
    } else if (tool == "stamp") {
      makeStampe(
        "M 0 0 L -8 -9 Q -15 -8 -15 1 L 0 13 L 25 -20 Q 27 -26 20 -24 z"
      );
    } else if (tool == "eraser") {
    }
    // canvas.freeDrawingBrush = Eraser;
  };

  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };

  const setColor = (color: string) => {
    if (canvas.getActiveObject()) canvas.getActiveObject().set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };

  useEffect(() => {
    //이전 정보를 저장하면서 툴이 바뀌게끔..
    if (canvas) {
      setTool(draws.tool);
      setSize(draws.size);
      setColor(draws.color);
    }
  }, [draws]);

  const toolChange = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };

  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };

  const colorChange = (color: string) => {
    dispatch(drawActions.colorChange(color));
  };

  const dispatch = useDispatch();
  return (
    <>
      <BottomButton
        onClick={() => {
          toolChange("pen");
        }}
      >
        펜
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChange("heartPatten");
        }}
      >
        하트패턴
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChange("spray");
        }}
      >
        스프레이
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChange("tape");
        }}
      >
        테이프
      </BottomButton>
      <BottomButton
        onClick={() => {
          toolChange("stamp");
        }}
      >
        도장
      </BottomButton>

      <BottomButton onClick={() => colorChange("black")}>검은색</BottomButton>
      <BottomButton onClick={() => colorChange("blue")}>파란색</BottomButton>
      <BottomButton onClick={() => sizeChange(20)}>큰 브러쉬</BottomButton>
      <BottomButton onClick={() => sizeChange(3)}>작은 브러쉬</BottomButton>
      <BottomButton onClick={() => toolChange("ERASER")}>지우개</BottomButton>
    </>
  );
}
