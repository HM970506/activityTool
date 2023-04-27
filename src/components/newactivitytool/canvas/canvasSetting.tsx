//import ReactTouchEvents from "react-touch-events";

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
    "object:modified": (e: any) => {
      const now = e.target;

      now.width = Math.round(now.width);
      now.height = Math.round(now.height);
      now.top = Math.round(now.top);
      now.left = Math.round(now.left);
      now.angle = Math.round(now.angle);
      now.scaleX = Math.round(now.scaleX * 1000) / 1000;
      now.scaleY = Math.round(now.scaleY * 1000) / 1000;
    },
  });

  return canvas;
}
