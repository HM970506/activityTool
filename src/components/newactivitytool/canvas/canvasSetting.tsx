const DeselctMultipleObjects = (canvas: any) => {
  if (canvas.getActiveObject().type == "activeSelection") {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }
};

export default function canvasSetting(canvas: any, setTest: any) {
  canvas.on({
    "selection:created": () => DeselctMultipleObjects(canvas),

    "selection:updated": () => DeselctMultipleObjects(canvas),
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
