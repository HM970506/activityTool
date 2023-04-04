import { fabric } from "fabric-with-erasing";

const tapeStep_1 = (canvas: any) => {
  console.log("1");
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
  console.log("2");
  const pointer = canvas.getPointer();
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.set({
    x2: pointer.x,
    y2: pointer.y,
  });

  canvas.renderAll();
};

const tapeStep_3 = (canvas: any) => {
  console.log("3");
  const now = canvas.getObjects()[canvas.getObjects().length - 1];
  now.setCoords();
  canvas.renderAll();
  canvas.taping = 1;
};

const DeselctMultipleObjects = (canvas: any) => {
  if (canvas.getActiveObject().type == "activeSelection") {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};

export default function canvasSetting(canvas: any) {
  canvas.on({
    "selection:created": () => {
      DeselctMultipleObjects(canvas);
    },
    "selection:updated": () => {
      DeselctMultipleObjects(canvas);
    },
  });

  canvas.on("mouse:down", () => {
    if (canvas.taping == 1) tapeStep_1(canvas);
    else if (canvas.taping == 2) tapeStep_3(canvas);
  });
  canvas.on("mouse:move", () => {
    if (canvas.taping == 2) tapeStep_2(canvas);
  });

  return canvas;
}
