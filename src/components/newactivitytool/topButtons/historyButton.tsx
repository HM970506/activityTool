import { useSelector } from "react-redux";
import "fabric-history";
import { DefaultButton } from "../styles/commonStyle";
import { ReducersType } from "../types";

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
      <DefaultButton onClick={undoHandler}>undo</DefaultButton>
      <DefaultButton onClick={redoHandler}>redo</DefaultButton>
    </>
  );
}
