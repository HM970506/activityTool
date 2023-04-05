import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";

export default function CanvasOpacity() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const opacity = useSelector((state: any) => state.nodeReducer.opacity);
  const dispatch = useDispatch();

  const opacityHandler = (e: any) => {
    dispatch(nodeActions.setOpacity(e.target.value));
  };

  useEffect(() => {
    console.log(opacity);
    if (canvas) {
      canvas.setBackgroundColor(
        `rgba(255,255,255,${opacity == 0 ? 0 : opacity / 100})`
      );
      canvas.renderAll();
    }
  }, [opacity]);

  return (
    <input
      type="range"
      min="0"
      max="100"
      value={opacity}
      onChange={opacityHandler}
    />
  );
}
