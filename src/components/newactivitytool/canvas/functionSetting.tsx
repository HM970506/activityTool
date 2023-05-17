import { fabric } from "fabric-with-erasing";
import { canvasType, fabricObjectType, stickerOptionType } from "../types";
import { IEvent } from "fabric/fabric-impl";

export default function functionSetting(canvas: canvasType) {
  const tapeStep_1 = () => {
    const pointer = canvas.getPointer();
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

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
    canvas.tape.state = 1;
  };

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    fabric.loadSVGFromString(
      canvas.stamp.shape,
      (objects: fabricObjectType[], options: stickerOptionType) => {
        const stamp = fabric.util.groupSVGElements(objects, options);

        stamp.fill = canvas.stamp.color;

        stamp.left = pointer.x;
        stamp.top = pointer.y;

        canvas.add(stamp);
        canvas.renderAll();
      }
    );
  };

  const panStep_1 = (e: IEvent | any) => {
    //console.log("팬켜짐:", typeof e.e, e.e);
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
      if (canvas.tape.state === 1) {
        //  console.log("tape");
        tapeStep_1();
      } else if (canvas.stamp.state === 1) {
        // console.log("stamp");
        stampStep_1();
      } else if (!canvas.isDrawingMode && !canvas.getActiveObject()) {
        // console.log("pan");
        panStep_1(e);
      }
    },
    "mouse:move": (e: IEvent | any) => {
      if (canvas.tape.state === 2) tapeStep_2();
      else if (canvas.panning === 2) panStep_2(e);
    },
    "mouse:up": (e: any) => {
      if (canvas.tape.state === 2) tapeStep_3();
      else if (canvas.panning === 2) panStep_3();
    },
  });
}
