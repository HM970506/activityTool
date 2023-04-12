import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, Toggle, Slider } from "../style";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { functionRemover } from "../../commonFunction";

export default function DrawToggle() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);

  //왜 처음 드로잉모드의 펜 사이즈가 지정이 안 되지..?
  //네트리파이에 env파일 정보도 넣어줘야 함~
  //

  const drawOn = () => {
    canvas.isDrawingMode = true;
    dispatch(nodeActions.setPan(false));
    canvas.on({ "selection:created": drawOff, "selection:updated": drawOff });
    canvas.discardActiveObject().renderAll();
  };

  const drawOff = () => {
    canvas.isDrawingMode = false;
    if (isDrawing) dispatch(nodeActions.setDraw(false));
    canvas.__eventListeners["mouse:out"] = functionRemover(
      canvas.__eventListeners["mouse:out"],
      "cursorOut"
    );
    canvas.__eventListeners["mouse:over"] = functionRemover(
      canvas.__eventListeners["mouse:over"],
      "cursorOver"
    );
    canvas.__eventListeners["mouse:down:before"] = functionRemover(
      canvas.__eventListeners["mouse:down:before"],
      "cursorDown"
    );
    canvas.__eventListeners["mouse:move"] = functionRemover(
      canvas.__eventListeners["mouse:move"],
      "cursorMove"
    );
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
