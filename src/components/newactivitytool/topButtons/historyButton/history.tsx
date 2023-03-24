import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyActions } from "../../../../store/common/historySlice";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const history = useSelector((state: any) => state.historyReducer.history);
  const nowIndex = useSelector((state: any) => state.historyReducer.nowIndex);
  const [timeslip, setTimeslip] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", (e: any) => {
        console.log("추가", e.target);
        dispatch(
          historyActions.push({
            id: e.target.id,
            value: JSON.stringify(e.target),
          })
        );
      });
      canvas.on("object:modified", (e: any) => {
        console.log("수정", e.target);
        dispatch(
          historyActions.push({
            id: e.target.id,
            value: JSON.stringify(e.target),
          })
        );
      });
      canvas.on("object:removed", (e: any) => {
        console.log("제거", e.target);
        dispatch(
          historyActions.push({
            id: e.target.id,
            value: JSON.stringify(e.target),
          })
        );
        // dispatch(historyActions.push(JSON.stringify(canvas.getObjects())));
      });
    }
  }, [canvas]);

  useEffect(() => {
    console.log(nowIndex, history);
  }, [history]);

  useEffect(() => {
    if (canvas && nowIndex >= 0 && timeslip) {
      const id = history[nowIndex].id;
      const changeObject = JSON.parse(history[nowIndex].value);
      console.log("복귀시작", changeObject);
      //변한 오브젝트를 찾아서 해당 값으로 되돌린다

      canvas._objects.forEach((obj: any) => {
        if (id == obj.id) {
          obj = { ...obj, ...changeObject };
          // obj.top = changeObject.top;
          // obj.left = changeObject.left;
          // obj.right = changeObject.right;
          // obj.angle = changeObject.angle;
          // obj.width = changeObject.width;
          // obj.height = changeObject.height;
          console.log("복귀완료", obj);
        }
      });

      canvas.discardActiveObject().renderAll();
      setTimeslip(false);
    }
  }, [nowIndex]);

  const Undo = () => {
    if (nowIndex - 1 >= -1) {
      dispatch(historyActions.setIndex(nowIndex - 1));
      setTimeslip(true);
    }
  };

  const Redo = () => {
    if (nowIndex + 1 < history.length) {
      dispatch(historyActions.setIndex(nowIndex + 1));

      setTimeslip(true);
    }
  };

  return (
    <>
      <button disabled={nowIndex >= 0 ? false : true} onClick={Undo}>
        undo
      </button>
      <button
        disabled={nowIndex < history.length ? false : true}
        onClick={Redo}
      >
        redo
      </button>
    </>
  );
}
