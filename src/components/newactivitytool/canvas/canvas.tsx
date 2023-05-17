import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { CanvasBackground } from "../styles/commonStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import { DEFAULT_CANVAS, ReducersType } from "../types";
import functionSetting from "./functionSetting";
import canvasSetting from "./canvasSetting";
import { useGesture, usePinch } from "@use-gesture/react";
import styled from "styled-components";

const Test = styled.div`
  position: absolute;
  width: 25%;
  height: 25%;
`;

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<any>("test");

  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const bind = useGesture({
    onDrag: (state) => {
      console.log("drag");
      setZoom("drag");
    },
    onPinch: ({ da, origin, offset }) => {
      // [d,a] 두 포인터의 절대 거리 및 각도
      // 두 터치 이벤트 사이의 중심 좌표
      // 스케일, 각도
      console.log(Math.round(offset[0] * 10) / 10, canvas.getZoom());
      const nowZoom = Math.round(offset[0] * 10) / 10;
      canvas.zoomToPoint(
        { x: Math.round(origin[0]), y: Math.round(origin[1]) },
        nowZoom != 0 ? nowZoom : 1
      );
      setZoom(
        `줌: ${canvas.getZoom()} 절대거리: ${Math.round(
          da[0]
        )} 스케일: ${Math.round(offset[0])}`
      );
    },
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      ...DEFAULT_CANVAS,
      height: window.innerHeight,
      width: window.innerWidth,
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,

      pinchZoom: { state: 0, coord: { x: 0, y: 0 } },
    });
    canvas.freeDrawingBrush.inverted = true;

    fabricSetting();
    canvasSetting(canvas);
    windowSetting(canvas, dispatch);
    functionSetting(canvas, dispatch);

    canvas.renderAll();

    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  return (
    <CanvasBackground ref={containerRef} {...bind()}>
      <canvas ref={canvasRef}></canvas>
      <Test>{zoom}</Test>
    </CanvasBackground>
  );
}
