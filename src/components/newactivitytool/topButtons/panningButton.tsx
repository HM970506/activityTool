import { useDispatch, useSelector } from "react-redux";
import { Label, Slider, Toggle } from "../styles/zoomButtonStyle";
import { fabric } from "fabric-with-erasing";
import { useEffect } from "react";
import { nodeActions } from "../../../store/common/nodeSlice";
import { functionRemover } from "../commonFunction";
import { ReducersType } from "../types";
import { IEvent } from "fabric/fabric-impl";

export default function PanningToggle() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const isPanning = useSelector(
    (state: ReducersType) => state.nodeReducer.isPanning
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (canvas) {
      if (isPanning) panOn();
      else panOff();
    }
  }, [isPanning]);

  const panHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nodeActions.setPan(e.target.checked));
  };

  const panStep_1 = (e: IEvent | any) => {
    const nextPoint = { x: 0, y: 0 };
    if (e.e.type === "touchstart") {
      nextPoint.x = e.e.changedTouches[0].pageX;
      nextPoint.y = e.e.changedTouches[0].pageY;
    } else {
      nextPoint.x = e.e.clientX;
      nextPoint.y = e.e.clientY;
    }

    canvas.lastClientX = nextPoint.x;
    canvas.lastClientY = nextPoint.y;

    canvas.panning = 2;
  };

  const panStep_2 = (e: IEvent | any) => {
    if (canvas.panning === 2) {
      const nextPoint = { x: 0, y: 0 };
      if (e.e.type === "touchmove") {
        nextPoint.x = e.e.changedTouches[0].pageX;
        nextPoint.y = e.e.changedTouches[0].pageY;
      } else {
        nextPoint.x = e.e.clientX;
        nextPoint.y = e.e.clientY;
      }

      if (canvas.lastClientX) canvas.deltaX = nextPoint.x - canvas.lastClientX;
      if (canvas.lastClientY) canvas.deltaY = nextPoint.y - canvas.lastClientY;
      canvas.lastClientX = nextPoint.x;
      canvas.lastClientY = nextPoint.y;

      canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
    }
  };

  const panStep_3 = () => {
    canvas.panning = 1;
  };

  const panOn = () => {
    canvas.defaultCursor = "move";

    canvas.forEachObject((object: any) => {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    canvas.selectable = false;

    dispatch(nodeActions.setDraw(false));

    canvas.on({
      "mouse:down": panStep_1,
      "mouse:move": panStep_2,
      "mouse:up": panStep_3,
      "selection:created": panOff,
    });

    canvas.discardActiveObject().renderAll();
  };
  const panOff = () => {
    canvas.defaultCursor = "default";

    canvas.forEachObject((object: any) => {
      object.evented =
        object.prevEvented !== undefined ? object.prevEvented : object.evented;
      object.selectable =
        object.prevSelectable !== undefined
          ? object.prevSelectable
          : object.selectable;
    });

    canvas.selectable = true;
    canvas.panning = 0;
    if (isPanning) dispatch(nodeActions.setPan(false));

    canvas.__eventListeners["mouse:down"] = functionRemover(
      canvas.__eventListeners["mouse:down"],
      "panStep_1"
    );
    canvas.__eventListeners["mouse:move"] = functionRemover(
      canvas.__eventListeners["mouse:move"],
      "panStep_2"
    );
    canvas.__eventListeners["mouse:up"] = functionRemover(
      canvas.__eventListeners["mouse:up"],
      "panStep_3"
    );
    canvas.__eventListeners["selection:created"] = functionRemover(
      canvas.__eventListeners["selection:created"],
      "panOff"
    );
  };

  return (
    <span>
      <span>화면이동</span>
      <Label>
        <Toggle type="checkbox" checked={isPanning} onChange={panHandler} />
        <Slider />
      </Label>
    </span>
  );
}
