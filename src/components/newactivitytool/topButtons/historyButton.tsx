import { useDispatch, useSelector } from "react-redux";
import "fabric-history";
import { ReducersType } from "../types";
import { ReactComponent as Next } from "./svg/next.svg";
import { ReactComponent as Prev } from "./svg/prev.svg";
import { HistoryContainer, HistoryButton } from "./style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useEffect } from "react";

export default function CanvasHistory() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const { undo, redo } = useSelector(
    (state: ReducersType) => state.nodeReducer.history
  );

  // useEffect(() => {
  //   console.log(undo, redo);
  // }, [undo, redo]);

  const undoHandler = () => {
    canvas.undo();
    if (undo > 0) {
      dispatch(nodeActions.setRedo(redo + 1));
      dispatch(nodeActions.setUndo(undo - 1));
    }
  };

  const redoHandler = () => {
    canvas.redo();
    if (redo > 0) {
      dispatch(nodeActions.setUndo(undo + 1));
      dispatch(nodeActions.setRedo(redo - 1));
    }
  };

  return (
    <HistoryContainer>
      <HistoryButton onClick={undoHandler} state={undo > 0 ? 1 : 0}>
        <Prev />
      </HistoryButton>
      <HistoryButton onClick={redoHandler} state={redo > 0 ? 1 : 0}>
        <Next />
      </HistoryButton>
    </HistoryContainer>
  );
}
