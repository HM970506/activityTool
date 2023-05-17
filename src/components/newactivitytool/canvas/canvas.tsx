import { fabric } from "fabric-with-erasing";
import "fabric-history";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect, useRef, useState } from "react";
import { CanvasBackground } from "../styles/commonStyle";
import fabricSetting from "./fabricSetting";
import windowSetting from "./windowSetting";
import {
  DEFAULT_CANVAS,
  ReducersType,
  fabricObjectType,
  stickerOptionType,
} from "../types";
import canvasSetting from "./canvasSetting";
import { useGesture } from "@use-gesture/react";
import { zoomActions } from "../../../store/common/zoomSlice";
import { IEvent } from "fabric/fabric-impl";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tapeStep_1 = (x: number, y: number) => {
    const points = [x, y, x, y];

    const line = new fabric.Line(points, {
      strokeWidth: canvas.tape.size,
      opacity: 0.5,
      fill: canvas.tape.color,
      stroke: canvas.tape.color,
      originX: "center",
      originY: "center",
    });

    canvas.add(line);
    canvas.tape.state = 2;
  };

  const tapeStep_2 = (x: number, y: number) => {
    const now = canvas.getObjects()[canvas.getObjects().length - 1];
    now.set({
      x2: x,
      y2: y,
    });

    canvas.renderAll();
  };

  const tapeStep_3 = () => {
    const now = canvas.getObjects()[canvas.getObjects().length - 1];
    now.setCoords();
    canvas.tape.state = 1;
  };

  const stamp = (x: number, y: number) => {
    fabric.loadSVGFromString(
      canvas.stamp.shape,
      (objects: fabricObjectType[], options: stickerOptionType) => {
        const stamp = fabric.util.groupSVGElements(objects, options);

        stamp.fill = canvas.stamp.color;

        stamp.left = x;
        stamp.top = y;

        canvas.add(stamp);
        canvas.renderAll();
      }
    );
  };

  const panStep_1 = (x: number, y: number) => {
    canvas.lastClientX = x;
    canvas.lastClientY = y;

    canvas.panning = 2;
  };

  const panStep_2 = (x: number, y: number) => {
    if (canvas.lastClientX) canvas.deltaX = x - canvas.lastClientX;
    if (canvas.lastClientY) canvas.deltaY = y - canvas.lastClientY;
    canvas.lastClientX = x;
    canvas.lastClientY = y;

    canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
  };

  const panStep_3 = () => {
    canvas.panning = 1;
  };

  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const bind = useGesture({
    onDrag: ({ type, xy }) => {
      if (type == "pointerdown") {
        if (canvas.tape.state === 1) tapeStep_1(xy[0], xy[1]);
        else if (canvas.stamp.state === 1) stamp(xy[0], xy[1]);
        else if (!canvas.isDrawingMode && canvas.getActiveObject() === null)
          panStep_1(xy[0], xy[1]);
      } else if (type == "pointermove") {
        if (canvas.tape.state === 2) tapeStep_2(xy[0], xy[1]);
        else if (canvas.panning === 2) panStep_2(xy[0], xy[1]);
      } else if (type == "pointerup") {
        if (canvas.tape.state === 2) tapeStep_3();
        else if (canvas.panning === 2) panStep_3();
      }
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
      dispatch(zoomActions.setZoom(canvas.getZoom()));
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

    canvas.renderAll();

    dispatch(nodeActions.setTextareaContainer(containerRef.current));
    dispatch(nodeActions.setCanvas(canvas));
  }, []);

  return (
    <CanvasBackground ref={containerRef} {...bind()}>
      <canvas ref={canvasRef}></canvas>
    </CanvasBackground>
  );
}
