import { Dispatch } from "@reduxjs/toolkit";
import { zoomActions } from "../../../store/common/zoomSlice";
import { canvasType } from "../types";

export default function windowSetting(
  canvas: canvasType,
  dispatch: Dispatch<
    | {
        payload: number;
        type: "zoomReducer/setZoom";
      }
    | {
        payload: number;
        type: "zoomReducer/setScale";
      }
  >
) {
  if (window.onresize === null) {
    const resizeHandler = () => {
      dispatch(zoomActions.setZoom(1));
      if (canvas) {
        const ratio = canvas.getWidth() / canvas.getHeight();
        const containerWidth = window.innerWidth;
        const zoom = containerWidth / canvas.getWidth();
        const scale = canvas.getZoom() * zoom;
        dispatch(zoomActions.setZoom(scale));
        canvas.setDimensions({
          width: containerWidth,
          height: containerWidth / ratio,
        });
        canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
        dispatch(zoomActions.setScale(scale));
        canvas.renderAll();
      }
    };

    window.addEventListener("resize", resizeHandler);
  }
}
