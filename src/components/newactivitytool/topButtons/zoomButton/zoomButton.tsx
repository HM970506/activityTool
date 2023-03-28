import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zoomActions } from "../../../../store/common/zoomSlice";
import { DefaultButton } from "../../style";

export default function ZoomButton() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const zoom = useSelector((state: any) => state.zoomReducer.zoom);
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
          dispatch(zoomActions.set(Math.round((zoom + 0.1) * 100) / 100));
        }}
      >
        확대
      </DefaultButton>
      {zoom}
      <DefaultButton
        onClick={() => {
          dispatch(zoomActions.set(Math.round((zoom - 0.1) * 100) / 100));
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
