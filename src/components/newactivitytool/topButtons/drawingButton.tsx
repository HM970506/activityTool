import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Toggle, Slider } from "../styles/zoomButtonStyle";
import { nodeActions } from "../../../store/common/nodeSlice";
import { ReducersType } from "../types";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const isDrawing = useSelector(
    (state: ReducersType) => state.nodeReducer.isDrawing
  );

  const drawOn = () => {
    canvas.isDrawingMode = true;
    dispatch(nodeActions.setPan(false));
    canvas.discardActiveObject().renderAll();
  };

  const drawOff = () => {
    canvas.isDrawingMode = false;
  };

  useEffect(() => {
    if (canvas) {
      if (isDrawing) drawOn();
      else drawOff();
    }
  }, [isDrawing]);

  const drawHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nodeActions.setDraw(e.target.checked));
  };

  return (
    <span>
      <span>그림모드</span>
      <Label>
        <Toggle type="checkbox" checked={isDrawing} onChange={drawHandler} />
        <Slider></Slider>
      </Label>
    </span>
  );
}
