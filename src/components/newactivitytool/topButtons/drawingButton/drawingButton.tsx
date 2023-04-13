import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Toggle, Slider } from "../style";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { functionRemover } from "../../commonFunction";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const draws = useSelector((state: any) => state.drawReducer);

  const drawOn = () => {
    canvas.isDrawingMode = true;
    console.log(draws);
    dispatch(nodeActions.setPan(false));
    canvas.on({ "selection:created": drawOff, "selection:updated": drawOff });
    canvas.discardActiveObject().renderAll();
  };

  const drawOff = () => {
    canvas.__eventListeners["selection:created"] = functionRemover(
      canvas.__eventListeners["selection:created"],
      "drawOff"
    );
  };

  useEffect(() => {
    if (canvas) {
      if (isDrawing) drawOn();
      else drawOff();
    }
  }, [isDrawing]);

  const drawHandler = (e: any) => {
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
