import { useDispatch, useSelector } from "react-redux";
import { Label, Slider, Toggle } from "../style";
import { fabric } from "fabric-with-erasing";
import { useEffect, useState } from "react";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { functionRemover } from "../../commonFunction";
import { tapeOff } from "../../bottomTools/decorations/tape";
import { stampOff } from "../../bottomTools/decorations/stamp";

export default function PanningToggle() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const isPanning = useSelector((state: any) => state.nodeReducer.isPanning);

  useEffect(() => {
    if (canvas && !isPanning) panOff();
  }, [isPanning]);

  const panStep_1 = (e: any) => {
    canvas.lastClientX = e.e.clientX;
    canvas.lastClientY = e.e.clientY;
    canvas.panning = 2;
  };

  const panStep_2 = (e: any) => {
    if (canvas.panning == 2) {
      if (canvas.lastClientX) canvas.deltaX = e.e.clientX - canvas.lastClientX;
      if (canvas.lastClientY) canvas.deltaY = e.e.clientY - canvas.lastClientY;

      canvas.lastClientX = e.e.clientX;
      canvas.lastClientY = e.e.clientY;

      canvas.relativePan(new fabric.Point(canvas.deltaX, canvas.deltaY));
    }
  };

  const panStep_3 = () => {
    canvas.panning = 1;
  };

  const panOn = () => {
    //1.커서 바꾸고
    canvas.defaultCursor = "move";

    //2.캔버스에 있는 오브젝트들 설정 바꾸고
    canvas.forEachObject((object: any) => {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    //3.캔버스 설정 바꾸고
    canvas.selectable = false;

    //4.팬은 켜고 나머지 설정들 끄고
    tapeOff(canvas);
    stampOff(canvas);
    dispatch(nodeActions.setDraw(false));
    dispatch(nodeActions.setPan(true));

    //5.함수 추가하고
    canvas.on({
      "mouse:down": panStep_1,
      "mouse:move": panStep_2,
      "mouse:up": panStep_3,
      "selection:created": panOff,
    });

    //6.렌더링
    canvas.discardActiveObject().renderAll();
  };
  const panOff = () => {
    //1.커서 바꾸고
    canvas.defaultCursor = "default";

    //2.캔버스에 있는 오브젝트들 설정 바꾸고
    canvas.forEachObject((object: any) => {
      object.evented =
        object.prevEvented !== undefined ? object.prevEvented : object.evented;
      object.selectable =
        object.prevSelectable !== undefined
          ? object.prevSelectable
          : object.selectable;
    });

    //3.캔버스 설정 바꾸고
    canvas.selectable = true;

    //4.팬 끄고
    canvas.panning = 0;
    dispatch(nodeActions.setPan(false));

    //5.함수 삭제하고
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

    //6.렌더링 할 거 없으므로 넘기기
  };

  const panHandler = (e: any) => {
    if (e.target.checked) {
      //켜는 버튼
      panOn();
    } else {
      //끄는 버튼
      panOff();
    }

    dispatch(nodeActions.setPan(e.target.checked));
  };

  return (
    <span>
      <span>화면이동</span>
      <Label>
        <Toggle type="checkbox" checked={isPanning} onChange={panHandler} />
        <Slider></Slider>
      </Label>
    </span>
  );
}
