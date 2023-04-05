import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zoomActions } from "../../../../store/common/zoomSlice";
import { DefaultButton } from "../../style";
import { fabric } from "fabric-with-erasing";

export default function ZoomButton() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const { zoom, zoomView, scale } = useSelector(
    (state: any) => state.zoomReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) dispatch(zoomActions.setZoom(canvas.getZoom()));
  }, [canvas]);

  useEffect(() => {
    if (canvas)
      canvas.zoomToPoint(
        new fabric.Point(canvas.width / 2, canvas.height / 2),
        zoom
      );
  }, [zoom]);

  return (
    <>
      <DefaultButton
        onClick={() => {
          const nowZoom = Math.round((canvas.getZoom() + 0.1) * 100) / 100;
          dispatch(zoomActions.setZoom(nowZoom));
          dispatch(zoomActions.setView(nowZoom));
        }}
      >
        확대
      </DefaultButton>
      {zoomView}
      <DefaultButton
        onClick={() => {
          const nowZoom = Math.round((canvas.getZoom() - 0.1) * 100) / 100;
          dispatch(zoomActions.setZoom(nowZoom));
          dispatch(zoomActions.setView(nowZoom));
        }}
      >
        축소
      </DefaultButton>
      <DefaultButton
        onClick={() => {
          dispatch(zoomActions.reset());
          canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        }}
      >
        원래대로
      </DefaultButton>
    </>
  );
}
