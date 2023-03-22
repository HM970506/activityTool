import { useDispatch, useSelector } from "react-redux";
import { BottomButton } from "../style";
import { fabric } from "fabric"; //기존 사용. 모듈x

import { useCallback, useEffect, useRef, useState } from "react";
import { drawActions } from "../../../store/common/drawSlice";

export default function DrawToolsMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer); //펜 관리

  //근데 이럴거면 리덕스가 아니라 그냥 useState를 써도 되지 않아?🤔 펜은 여기서밖에 안 쓰니까..
  //혹시 모르니까 우선 리덕스로 하고.. 끝까지 도구를 사용하는 곳이 없으면 여기에 useReducer로 다시 정리하자

  //커서 부분 시작

  const CURSOR = new Map([
    ["stamp", `./stampGripHand.png`],
    ["pen", "./pencil.png"],
  ]);

  const PenBrush = new fabric.PencilBrush(canvas);
  const SprayBrush = new fabric.SprayBrush(canvas, { density: 1 });
  //  const Eraser = new fabric.EraserBrush(canvas);

  //커스텀 브러쉬 추가1: 패턴 배경 브러쉬
  const img = new Image();
  img.src = "./pattern.jpg";
  const HeartPatternBrush = new fabric.PatternBrush(canvas);
  HeartPatternBrush.source = img;
  //커스텀 브러쉬 추가1 끝

  //커스텀 브러쉬 추가2: 스탬프 브러쉬
  const stamping = (e: any) => {
    if (draws.tool == "stamp" && draws.isDrawing) {
      canvas.selection = false;
      canvas.isDrawingMode = false;

      fabric.loadSVGFromUrl("./stamp.svg", (objects: any, options: any) => {
        canvas.add(fabric.util.groupSVGElements(objects, options));
        canvas.calcOffset();
        canvas.renderAll();
      });
    }
  };

  //커스텀 브러쉬 추가2끝

  //브러쉬 정보가 바뀜 시작
  useEffect(() => {
    if (canvas) {
      if (draws.isDrawing && draws.tool != "stamp") {
        canvas.selection = true;
        canvas.isDrawingMode = true;
      }
      setTool(draws.tool);

      //커서도 바꾸기
      canvas.hoverCursor = `url("./${draws.tool}.png"), auto`;
      console.log(canvas.hoverCursor);
      setSize(draws.size);
      setColor(draws.color);
    }
  }, [draws]);
  //브러쉬 정보가 바뀜 끝

  //실질적으로 브러쉬를 바꾸는 함수들 시작
  const setTool = (tool: string) => {
    canvas.off("mouse:up", stamping);
    if (tool == "pen") canvas.freeDrawingBrush = PenBrush;
    else if (tool == "heartPatten") canvas.freeDrawingBrush = HeartPatternBrush;
    else if (tool == "spray") canvas.freeDrawingBrush = SprayBrush;
    else if (tool == "tape") {
    } else if (tool == "stamp") {
      if (draws.isDrawing) canvas.on("mouse:up", stamping);
    } else if (tool == "eraser") {
      // canvas.freeDrawingBrush = Eraser;
    }
  };
  const setSize = (size: number) => {
    canvas.freeDrawingBrush.width = size;
  };
  const setColor = (color: string) => {
    if (canvas.getActiveObject()) canvas.getActiveObject().set("fill", color);
    else canvas.freeDrawingBrush.color = color;
  };
  //실질적으로 브러쉬를 바꾸는 함수들 끝

  //보일러 플레이트를 줄이기 위한 함수들 시작

  const toolChange = (tool: string) => {
    dispatch(drawActions.toolChange(tool));
  };
  const sizeChange = (size: number) => {
    dispatch(drawActions.sizeChange(size));
  };
  const colorChange = (color: string) => {
    dispatch(drawActions.colorChange(color));
  };
  //보일러 플레이트를 줄이기 위한 함수들 끝

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
