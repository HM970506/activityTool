import { fabric } from "fabric-with-erasing";

const tapeStep_1 = (canvas: any) => {
  const pointer = canvas.getPointer();
  const points = [pointer.x, pointer.y, pointer.x, pointer.y];

  const line = new fabric.Line(points, {
    strokeWidth: 30,
    fill: "red",
    stroke: "red",
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

const panStep_1 = (e: any, canvas: any) => {
  canvas.lastClientX = e.e.clientX;
  canvas.lastClientY = e.e.clientY;
  canvas.penState = 2;
};

const panStep_2 = (e: any, canvas: any) => {
  if (canvas.lastClientX) canvas.deltaX = e.e.clientX - canvas.lastClientX;
  if (canvas.lastClientY) canvas.deltaY = e.e.clientY - canvas.lastClientY;

  canvas.lastClientX = e.e.clientX;
  canvas.lastClientY = e.e.clientY;

  canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
  canvas.renderAll();

  console.log(canvas.penState, canvas.lastClientX, canvas.lastClientY);
};

const panStep_3 = (e: any, canvas: any) => {
  canvas.penState = 1;
};

export default function canvasSetting(canvas: any) {
  canvas.taping = 0;
  canvas.panState = 0;

  //e로 넣으면 e.target이 비어있을 때가 있다. canvas로 직접 넣어주자
  canvas.on({
    "selection:created": () => DeselctMultipleObjects(canvas),
    "selection:updated": () => DeselctMultipleObjects(canvas),
    "mouse:down": (e: any) => {
      if (canvas.taping == 1) tapeStep_1(canvas);
      else if (canvas.taping == 2) tapeStep_3(canvas);
      else if (canvas.panState == 1) panStep_1(e, canvas);
      else if (canvas.panState == 2) panStep_3(e, canvas);
    },
    "mouse:move": (e: any) => {
      if (canvas.taping == 2) tapeStep_2(canvas);
      else if (canvas.panState == 2) panStep_2(e, canvas);
    },
  });

  return canvas;
}
