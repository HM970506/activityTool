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
    canvas.on("object:added", function (this: any, e: any) {
      if (e.target.id == "cursor") return;
      e.target.index = canvas.getObjects().length - 1;
      dispatch(
        historyActions.push({
          act: "add",
          value: JSON.stringify(e.target), //당시의 value. target에서는 해당 값이 계속 바뀜.
          target: e.target,
        })
      );
    });
  };

  const canvasRemoveHandler = () => {
    canvas.on("object:removed", function (e: any) {
      if (e.target.id == "cursor") return;
      console.log("제거");
      dispatch(
        historyActions.push({
          act: "delete",
          value: JSON.stringify(e.target),
          target: e.target,
        })
      );
    });
  };

  useEffect(() => {
    if (canvas) {
      canvasAddHandler();
      canvasRemoveHandler();
      canvas.on(
        "before:transform",
        ({ e, transform }: { e: any; transform: any }) => {
          if (transform.target.id == "cursor") return;
          console.log("수정");
          dispatch(
            historyActions.push({
              act: "modify",
              value: JSON.stringify(transform.target),
              target: transform.target,
            })
          );
        }
      );
    }
  }, [canvas]);

  useEffect(() => {
    console.log(nowIndex, history);
  }, [nowIndex]);

  useEffect(() => {
    if (canvas && nowIndex >= 0 && timeslip != "") {
      canvas.__eventListeners["object:added"] = [];
      canvas.__eventListeners["object:removed"] = [];

      const { act, target, value } = history[nowIndex];

      const changeObject = JSON.parse(value);

      if (act == "modify") {
        console.log("이동이나 변화");
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
          }
        });
      } else {
        let check = true;

        //있음-삭제
        canvas._objects.forEach((obj: any) => {
          if (target.id == obj.id) {
            console.log("있으니까 삭제");
            canvas.remove(obj);
            check = false;
          }
        });

        //없음-생성
        if (check) {
          console.log("없으니까 생성");
          const nowObjects = canvas.getObjects();
          canvas._objects = [
            ...nowObjects.slice(0, target.index),
            target,
            ...nowObjects.slice(target.index, nowObjects.length),
          ];
          console.log(canvas._objects);
        }
        //remove하면 타겟이 아예 사라지나? 테스트해 봅시다.
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
