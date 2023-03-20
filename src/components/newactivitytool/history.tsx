import { useSelector } from "react-redux";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const Undo = () => {
    canvas.undo();
  };

  const Redo = () => {
    canvas.redo();
  };

  return (
    <>
      <button onClick={Undo}>undo</button>
      <button onClick={Redo}>redo</button>
    </>
  );
}
