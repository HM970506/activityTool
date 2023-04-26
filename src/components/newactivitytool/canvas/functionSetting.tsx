import { fabric } from "fabric-with-erasing";
import { canvasType, stickerOptionType } from "../types";
import { IEvent } from "fabric/fabric-impl";
import { Dispatch } from "react";
import { nodeActions } from "../../../store/common/nodeSlice";

export default function functionSetting(
  canvas: canvasType,
  dispatch: Dispatch<any> | undefined
) {
  const tapeStep_1 = () => {
    const pointer = canvas.getPointer();
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    const line = new fabric.Line(points, {
      strokeWidth: canvas.tapeState.size,
      opacity: canvas.tapeState.opacity,
      fill: canvas.toolColor,
      stroke: canvas.toolColor,
      originX: "center",
      originY: "center",
    });

    canvas.add(line);
    canvas.taping = 2;
  };

  const tapeStep_2 = () => {
    const pointer = canvas.getPointer();
    const now = canvas.getObjects()[canvas.getObjects().length - 1];
    now.set({
      x2: pointer.x,
      y2: pointer.y,
    });

    canvas.renderAll();
  };

  const tapeStep_3 = () => {
    const now = canvas.getObjects()[canvas.getObjects().length - 1];
    now.setCoords();
    canvas.taping = 1;
  };

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    fabric.loadSVGFromString(
      canvas.stamping,
      (objects: Object[], options: stickerOptionType) => {
        const stamp = fabric.util.groupSVGElements(objects, options);

        stamp.fill = canvas.toolColor;

        stamp.left = pointer.x;
        stamp.top = pointer.y;

        canvas.add(stamp);
        canvas.renderAll();
      }
    );
  };

  const panStep_1 = (e: IEvent | any) => {
    console.log("touchevent", e);
    const nextPoint = { x: 0, y: 0 };
    if (e.e.type === "touchstart") {
      nextPoint.x = e.e.changedTouches[0].pageX;
      nextPoint.y = e.e.changedTouches[0].pageY;
    } else {
      nextPoint.x = e.e.clientX;
      nextPoint.y = e.e.clientY;
    }

    canvas.lastClientX = nextPoint.x;
    canvas.lastClientY = nextPoint.y;

    canvas.panning = 2;
  };

  const panStep_2 = (e: IEvent | any) => {
    const nextPoint = { x: 0, y: 0 };
    if (e.e.type === "touchmove") {
      nextPoint.x = e.e.changedTouches[0].pageX;
      nextPoint.y = e.e.changedTouches[0].pageY;
    } else {
      nextPoint.x = e.e.clientX;
      nextPoint.y = e.e.clientY;
    }

    if (canvas.lastClientX) canvas.deltaX = nextPoint.x - canvas.lastClientX;
    if (canvas.lastClientY) canvas.deltaY = nextPoint.y - canvas.lastClientY;
    canvas.lastClientX = nextPoint.x;
    canvas.lastClientY = nextPoint.y;

    canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
  };

  const panStep_3 = () => {
    canvas.panning = 1;
  };

  canvas.on({
    "mouse:down": (e: IEvent | any) => {
      if (canvas.taping === 1) tapeStep_1();
      else if (canvas.stamping !== "") stampStep_1();
      else if (canvas.panning === 1) panStep_1(e);
    },
    "mouse:move": (e: IEvent | any) => {
      if (canvas.taping === 2) tapeStep_2();
      else if (canvas.panning === 2) panStep_2(e);
    },
    "mouse:up": () => {
      if (canvas.taping === 2) tapeStep_3();
      else if (canvas.panning === 2) panStep_3();
    },
    "selection:created": () => {
      console.log("선택 으럅", canvas);
      if (dispatch != undefined) {
        dispatch(nodeActions.setDraw(false));
        dispatch(nodeActions.setPan(false));
      }
      canvas.isDrawingMode = false;
      canvas.panning = 0;
    },
    "selection:updated": () => {
      if (dispatch != undefined) {
        dispatch(nodeActions.setDraw(false));
        dispatch(nodeActions.setPan(false));
      }
      canvas.isDrawing = false;
      canvas.panning = 0;
    },
  });
}
