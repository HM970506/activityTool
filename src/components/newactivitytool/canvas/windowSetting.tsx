import { fabric } from "fabric-with-erasing";
import { deleteProps } from "../setting/deleteButton";
import { nodeActions } from "../../../store/common/nodeSlice";
import { zoomActions } from "../../../store/common/zoomSlice";

export default function windowSetting(dispatch: any, canvas: any) {
  if (window.onresize == null) {
    const resizeHandler = () => {
      dispatch(nodeActions.setZoom(1));
      if (canvas) {
        const ratio = canvas.getWidth() / canvas.getHeight();
        const containerWidth = window.innerWidth;
        const zoom = containerWidth / canvas.getWidth();
        const scale = canvas.getZoom() * zoom;
        dispatch(nodeActions.setZoom(scale));
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
