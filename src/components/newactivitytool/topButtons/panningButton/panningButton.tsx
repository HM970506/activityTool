import { useDispatch, useSelector } from "react-redux";
import { Label, Slider, Toggle } from "../style";
import { drawActions } from "../../../../store/common/drawSlice";
import { useEffect, useState } from "react";
import { nodeActions } from "../../../../store/common/nodeSlice";

export default function PanningToggle() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const isPanning = useSelector((state: any) => state.nodeReducer.isPanning);

  return (
    <span>
      <span>화면이동</span>
      <Label>
        <Toggle
          type="checkbox"
          checked={isPanning}
          onChange={(e: any) => {
            if (canvas.panState == 0) {
              canvas.defaultCursor = "move";
              canvas.forEachObject((object: any) => {
                object.prevEvented = object.evented;
                object.prevSelectable = object.selectable;
                object.evented = false;
                object.selectable = false;
              });
              canvas.selectable = false;
              canvas.panState = 1;
              dispatch(nodeActions.setPan(true));
            } else {
              canvas.defaultCursor = "default";
              canvas.forEachObject((object: any) => {
                object.evented =
                  object.prevEvented !== undefined
                    ? object.prevEvented
                    : object.evented;
                object.selectable =
                  object.prevSelectable !== undefined
                    ? object.prevSelectable
                    : object.selectable;
              });
              canvas.selectable = true;
              canvas.panState = 0;
              dispatch(nodeActions.setPan(false));
            }
          }}
        />
        <Slider></Slider>
      </Label>
    </span>
  );
}
