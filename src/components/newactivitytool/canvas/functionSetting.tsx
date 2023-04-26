import { fabric } from "fabric-with-erasing";
import { canvasType, stickerOptionType } from "../types";
import { IEvent } from "fabric/fabric-impl";

export const tapeStep_1 = (canvas: canvasType) => {
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

export const tapeStep_2 = (canvas: canvasType) => {
  const pointer = canvas.getPointer();
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.set({
    x2: pointer.x,
    y2: pointer.y,
  });

  canvas.renderAll();
};

export const tapeStep_3 = (canvas: canvasType) => {
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.setCoords();
  canvas.taping = 1;
};

export const stampStep_1 = (canvas: canvasType) => {
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

export const panStep_1 = (e: IEvent | any, canvas: canvasType) => {
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

export const panStep_2 = (e: IEvent | any, canvas: canvasType) => {
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

export const panStep_3 = (canvas: canvasType) => {
  canvas.panning = 1;
};
