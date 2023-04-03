import { fabric } from "fabric-with-erasing";

const tapeStep_1 = (canvas: any) => {
  if (canvas.taping == 1) {
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
  }
};

const tapeStep_2 = (canvas: any) => {
  if (canvas.taping == 2) {
    const pointer = canvas.getPointer();
    canvas.getObjects()[canvas.getObjects().length - 1].set({
      x2: pointer.x,
      y2: pointer.y,
    });
    canvas.renderAll();
  }
};

const tapeStep_3 = (canvas: any) => {
  if (canvas.taping == 2) {
    canvas.getObjects()[canvas.getObjects().length - 1].setCoords();

    canvas.renderAll();
    canvas.taping = 1;
  }
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
    tapeStep_1(canvas);
  });
  canvas.on("mouse:move", () => {
    tapeStep_2(canvas);
  });
  canvas.on("mouse:up", () => {
    tapeStep_3(canvas);
  });

  return canvas;
}
