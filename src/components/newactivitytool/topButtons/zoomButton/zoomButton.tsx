import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zoomActions } from "../../../../store/common/zoomSlice";
import { DefaultButton } from "../../styles/indexStyle";
import { fabric } from "fabric-with-erasing";
import { ReducersType } from "../../types";

export default function ZoomButton() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { zoom, zoomView } = useSelector(
    (state: ReducersType) => state.zoomReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) dispatch(zoomActions.setZoom(canvas.getZoom()));
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      const point = new fabric.Point(canvas.width / 2, canvas.height / 2);
      canvas.zoomToPoint(point, zoom);
    }
  }, [zoom]);

  const zoomHandler = (zoom: boolean) => {
    let state = zoom ? 0.1 : -0.1;

    const nowZoom = Math.round((canvas.getZoom() + state) * 100) / 100;
    dispatch(zoomActions.setZoom(nowZoom));
    dispatch(zoomActions.setView(nowZoom));
  };

  const zoomPlus = () => {
    zoomHandler(true);
  };

  const zoomMinus = () => {
    zoomHandler(false);
  };

  const restoration = () => {
    dispatch(zoomActions.reset());
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  };

  return (
    <>
      <DefaultButton onClick={zoomPlus}>확대</DefaultButton>
      {zoomView}
      <DefaultButton onClick={zoomMinus}>축소</DefaultButton>
      <DefaultButton onClick={restoration}>원래대로</DefaultButton>
    </>
  );
}
