import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyActions } from "../../../../store/common/historySlice";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const history = useSelector((state: any) => state.historyReducer.history);
  const nowIndex = useSelector((state: any) => state.historyReducer.nowIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(history);
  }, [history]);

  const Undo = () => {
    if (nowIndex - 1 >= 0) dispatch(historyActions.setIndex(nowIndex - 1));
  };

  const Redo = () => {
    if (nowIndex + 1 < history.length)
      dispatch(historyActions.setIndex(nowIndex + 1));
  };

  return (
    <>
      <button onClick={Undo}>undo</button>
      <button onClick={Redo}>redo</button>
    </>
  );
}
