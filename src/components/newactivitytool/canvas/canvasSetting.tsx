import { fabric } from "fabric-with-erasing";
import { STAMP } from "../bottomTools/decorationSample";

const tapeStep_1 = (canvas: any) => {
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

const tapeStep_2 = (canvas: any) => {
  const pointer = canvas.getPointer();
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.set({
    x2: pointer.x,
    y2: pointer.y,
  });

  canvas.renderAll();
};

const tapeStep_3 = (canvas: any) => {
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.setCoords();
  canvas.taping = 1;
};

const DeselctMultipleObjects = (canvas: any) => {
  if (canvas.getActiveObject().type == "activeSelection") {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};

const panStep_1 = (e: any) => {
  const canvas = e.target;
  canvas.lastClientX = e.e.clientX;
  canvas.lastClientY = e.e.clientY;
  canvas.panning = 2;
};

const panStep_2 = (e: any) => {
  const canvas = e.target;
  if (canvas.lastClientX) canvas.deltaX = e.e.clientX - canvas.lastClientX;
  if (canvas.lastClientY) canvas.deltaY = e.e.clientY - canvas.lastClientY;

  canvas.lastClientX = e.e.clientX;
  canvas.lastClientY = e.e.clientY;

  canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
};

const panStep_3 = (e: any) => {
  const canvas = e.target;
  canvas.panning = 1;
};

const stampStep_1 = (e: any) => {
  const canvas = e.target;
  const pointer = canvas.getPointer();
  fabric.loadSVGFromString(
    STAMP[canvas.stamping].value,
    (objects: any, options: any) => {
      const stamp = fabric.util.groupSVGElements(objects, options);

      stamp.fill = canvas.toolColor;

      stamp.left = pointer.x;
      stamp.top = pointer.y;

      canvas.add(stamp);
      canvas.renderAll();
    }
  );
};

export default function canvasSetting(canvas: any, setTest: any) {
  canvas.on({
    "selection:created": () => DeselctMultipleObjects(canvas),
    "selection:updated": () => DeselctMultipleObjects(canvas),
    "mouse:down": (e: any) => {
      e.target = canvas;
      if (e.target.taping == 1) tapeStep_1(e.target);
      else if (e.target.panning == 1) panStep_1(e);
      else if (e.target.stamping >= 0) stampStep_1(e);
    },
    "mouse:move": (e: any) => {
      e.target = canvas;
      if (e.target.taping == 2) tapeStep_2(e.target);
      else if (e.target.panning == 2) panStep_2(e);
    },
    "mouse:up": (e: any) => {
      e.target = canvas;
      if (e.target.taping == 2) tapeStep_3(e.target);
      else if (e.target.panning == 2) panStep_3(e);
    },
    "touch:gesture": () => {
      setTest("gesture");
    },
    "touch:drag": () => {
      setTest("drag");
    },
    "touch:orientation": () => {
      setTest("orientation");
    },
    "touch:shake": () => {
      setTest("shake");
    },
    "touch:longpress": () => {
      setTest("longpress");
    },
  });

  return canvas;
}
