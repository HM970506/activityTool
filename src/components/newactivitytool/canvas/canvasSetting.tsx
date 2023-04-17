//import ReactTouchEvents from "react-touch-events";

const DeselctMultipleObjects = (canvas: any) => {
  if (canvas.getActiveObject().type == "activeSelection") {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};

export default function canvasSetting(canvas: any) {
  canvas.on({
    "selection:created": () => DeselctMultipleObjects(canvas),
    "selection:updated": () => DeselctMultipleObjects(canvas),
  });

  return canvas;
}
