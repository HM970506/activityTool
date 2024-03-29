import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { ReducersType } from "../types";

export default function CanvasOpacity() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const opacity = useSelector(
    (state: ReducersType) => state.nodeReducer.opacity
  );
  const dispatch = useDispatch();

  const opacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nodeActions.setOpacity(parseInt(e.target.value)));
  };

  useEffect(() => {
    if (canvas) {
      canvas.setBackgroundColor(
        `rgba(255,255,255,${opacity === 0 ? 0 : opacity / 100})`
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
