//import ReactTouchEvents from "react-touch-events";

import { IEvent } from "fabric/fabric-impl";
import { canvasType } from "../types";

const DeselctMultipleObjects = (canvas: canvasType) => {
  if (canvas.getActiveObject().type === "activeSelection") {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};

export default function canvasSetting(canvas: canvasType) {
  canvas.on({
    "selection:created": () => DeselctMultipleObjects(canvas),
    "selection:updated": () => DeselctMultipleObjects(canvas),
    "object:modified": (e: IEvent) => {
      const now = e.target;
      if (now) {
        now.width = now.width !== undefined ? Math.round(now.width) : 0;
        now.height = now.height !== undefined ? Math.round(now.height) : 0;
        now.top = now.top !== undefined ? Math.round(now.top) : 0;
        now.left = now.left !== undefined ? Math.round(now.left) : 0;
        now.angle = now.angle !== undefined ? Math.round(now.angle) : 0;
        now.scaleX =
          now.scaleX !== undefined ? Math.round(now.scaleX * 1000) / 1000 : 0;
        now.scaleY =
          now.scaleY !== undefined ? Math.round(now.scaleY * 1000) / 1000 : 0;
      }
      console.log(now);
    },
  });

  return canvas;
}
