import { useSelector } from "react-redux";
import "fabric-history";
import { ReducersType } from "../types";
import { ReactComponent as Next } from "./next.svg";
import { ReactComponent as Prev } from "./prev.svg";
import { TopButton } from "./style";

export default function CanvasHistory() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);

  const undoHandler = () => {
    canvas.undo();
  };

  const redoHandler = () => {
    canvas.redo();
  };

  return (
    <>
      <TopButton onClick={undoHandler}>
        <Prev />
      </TopButton>
      <TopButton onClick={redoHandler}>
        <Next />
      </TopButton>
    </>
  );
}
