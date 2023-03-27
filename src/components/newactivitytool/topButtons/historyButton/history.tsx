import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyActions } from "../../../../store/common/historySlice";

export default function CanvasHistory() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const history = useSelector((state: any) => state.historyReducer.history);
  const nowIndex = useSelector((state: any) => state.historyReducer.nowIndex);
  const [timeslip, setTimeslip] = useState<string>("");

  const dispatch = useDispatch();

  const canvasAddHandler = () => {
    canvas.on("object:added", (e: any) => {
      if (e.target.id == "cursor") return;
      dispatch(historyActions.renden());

      e.target.id = new Date().getTime().toString(36);
      e.target.before = JSON.stringify(e.target);

      dispatch(
        historyActions.push({
          act: "add",
          target: e.target,
        })
      );
    });
  };

  const canvasRemoveHandler = () => {
    canvas.on("object:removed", (e: any) => {
      if (e.target.id == "cursor") return;
      console.log("제거");
      dispatch(
        historyActions.push({
          act: "delete",
          target: e.target,
        })
      );
    });
  };

  const canvasModifyHandler = () => {
    canvas.on("object:modified", (e: any) => {
      if (e.target.id == "cursor") return;
      console.log("수정");
      console.log(e.target);
      dispatch(
        historyActions.push({
          act: "modify",
          before: e.target.before,
          after: JSON.stringify(e.target),
          target: e.target,
        })
      );
      e.target.before = JSON.stringify(e.target);
    });
  };

  useEffect(() => {
    if (canvas) {
      canvasAddHandler();
      canvasRemoveHandler();
      canvasModifyHandler();
    }
  }, [canvas]);

  useEffect(() => {
    console.log(nowIndex, history);
  }, [history]);

  const exchange = (target: any, changeObject: any) => {
    canvas._objects.forEach((obj: any) => {
      if (target.id == obj.id) {
        //그냥 곧바로 저장하는 방법은 없나..?
        obj.top = changeObject.top;
        obj.left = changeObject.left;
        obj.right = changeObject.right;
        obj.angle = changeObject.angle;
        obj.width = changeObject.width;
        obj.height = changeObject.height;
        obj.scaleX = changeObject.scaleX;
        obj.scaleY = changeObject.scaleY;
        obj.text = changeObject.text;
      }
    });
  };

  useEffect(() => {
    if (canvas && nowIndex >= 0 && timeslip != "") {
      canvas.__eventListeners["object:added"] = [];
      canvas.__eventListeners["object:removed"] = [];

      const { act, target, before, after } = history[nowIndex];

      if (act == "modify") {
        console.log("이동이나 변화");

        const bef = JSON.parse(before);
        const aft = JSON.parse(after);

        if (timeslip == "undo") exchange(target, bef);
        else exchange(target, aft);
      } else {
        let check = true;

        canvas._objects.forEach((obj: any) => {
          if (target.id == obj.id) {
            canvas.remove(obj);
            check = false;
          }
        });

        if (check) {
          const nowObjects = canvas.getObjects();

          //도중에 삭제되면 인덱스가 바뀔텐데..
          canvas._objects = [
            ...nowObjects.slice(0, target.index),
            target,
            ...nowObjects.slice(target.index, nowObjects.length),
          ];
        }
      }
      canvas.discardActiveObject().renderAll();

      if (timeslip == "undo" && nowIndex >= 0)
        dispatch(historyActions.setIndex(nowIndex - 1));
      setTimeslip("");
      canvasAddHandler();
      canvasRemoveHandler();
    }
  }, [timeslip]);

  const Undo = () => {
    if (nowIndex >= 0) {
      console.log("undo", nowIndex);
      setTimeslip("undo");
    }
  };

  const Redo = () => {
    if (nowIndex + 1 < history.length) {
      console.log("redo", nowIndex);
      dispatch(historyActions.setIndex(nowIndex + 1));
      setTimeslip("redo");
    }
  };

  return (
    <>
      <button disabled={nowIndex >= 0 ? false : true} onClick={Undo}>
        undo
      </button>
      <button
        disabled={nowIndex < history.length - 1 ? false : true}
        onClick={Redo}
      >
        redo
      </button>
    </>
  );
}
