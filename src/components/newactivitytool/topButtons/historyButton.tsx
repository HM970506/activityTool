import { useSelector } from "react-redux";
import "fabric-history";
import { ReducersType } from "../types";
import { ReactComponent as Next } from "./svg/next.svg";
import { ReactComponent as Prev } from "./svg/prev.svg";
import { HistoryContainer, TopButton } from "./style";

export default function CanvasHistory() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  const undoHandler = () => {
    canvas.undo();
  };

  const redoHandler = () => {
    canvas.redo();
  };

  return (
    <HistoryContainer>
      <TopButton onClick={undoHandler}>
        <Prev />
      </TopButton>
      <TopButton onClick={redoHandler}>
        <Next />
      </TopButton>
    </HistoryContainer>
  );
}
