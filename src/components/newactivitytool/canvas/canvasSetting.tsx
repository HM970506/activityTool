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
  });

  return canvas;
}
