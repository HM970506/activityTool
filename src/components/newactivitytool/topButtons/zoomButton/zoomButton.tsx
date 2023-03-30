import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zoomActions } from "../../../../store/common/zoomSlice";
import { DefaultButton } from "../../style";

export default function ZoomButton() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const { zoom, zoomView, scale } = useSelector(
    (state: any) => state.zoomReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) dispatch(zoomActions.set(canvas.getZoom()));
  }, [canvas]);

  useEffect(() => {
    if (canvas) canvas.setZoom(zoom);
  }, [zoom]);

  return (
    <>
      <DefaultButton
        onClick={() => {
          const nowZoom = Math.round((canvas.getZoom() + 0.1) * 100) / 100;
          dispatch(zoomActions.set(nowZoom));
          dispatch(zoomActions.setView(nowZoom));
        }}
      >
        확대
      </DefaultButton>
      {zoomView}
      <DefaultButton
        onClick={() => {
          const nowZoom = Math.round((canvas.getZoom() - 0.1) * 100) / 100;
          dispatch(zoomActions.set(nowZoom));
          dispatch(zoomActions.setView(nowZoom));
        }}
      >
        축소
      </DefaultButton>
      <DefaultButton
        onClick={() => {
          dispatch(zoomActions.reset());
        }}
      >
        원래대로
      </DefaultButton>
    </>
  );
}
