//import ReactTouchEvents from "react-touch-events";

import { IEvent } from "fabric/fabric-impl";
import { canvasType } from "../types";
import editControlHandler from "../common/editControlHandler";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { zoomActions } from "../../../store/common/zoomSlice";

export default function canvasSetting(canvas: canvasType, dispatch: any) {
  const DeselctMultipleObjects = () => {
    if (canvas.getActiveObject().type === "activeSelection") {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const HistorySetteing = () => {
    if (canvas.historyRedo.length > 0) {
      canvas.historyRedo = [];
      dispatch(nodeActions.setRedo(0));
    }

    if (canvas.historyUndo.length > 4) canvas.historyUndo.shift();

    dispatch(nodeActions.setUndo(canvas.historyUndo.length));
  };

  const OptionSetting = () => {
    dispatch(categoryActions.optionChange(false));
  };

  const ZoomSetting = (opt: any) => {
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    dispatch(zoomActions.setZoom(zoom));
    opt.e.preventDefault();
    opt.e.stopPropagation();
  };

  canvas.on({
    "mouse:up": () => {
      HistorySetteing();
    },
    "mouse:down": () => {
      OptionSetting();
    },
    "mouse:wheel": (opt: any) => {
      ZoomSetting(opt);
    },
    "selection:created": () => {
      DeselctMultipleObjects();
      editControlHandler(canvas);
      dispatch(nodeActions.setUndo(canvas.historyUndo.length));
    },
    "selection:updated": () => {
      DeselctMultipleObjects();
      editControlHandler(canvas);
    },

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
    },
  });
  return canvas;
}
