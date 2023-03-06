import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";

export default function PhotoMenu() {
  const dispatch = useDispatch();
  const select = useSelector((state: any) => state.selectReducer.select);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);

  const shapeChange = (shape: string) => {
    if (select != null || select != undefined) {
      dispatch(
        nodeActions.modifyNodes({
          index: select,
          modifyProps: {
            frame: shape,
          },
        })
      );
      dispatch(selectActions.selectChange(null));
    }
  };

  const offsetArray = [
    { x: 5, y: 0 },
    { x: -5, y: 0 },
    { x: 0, y: 5 },
    { x: 0, y: -5 },
  ];

  const offsetChange = (offset: number | null) => {
    if (select != null || select != undefined) {
      dispatch(
        nodeActions.modifyNodes({
          index: select,
          modifyProps: {
            fillPatternOffsetX:
              offset === null
                ? 0
                : nodes[select].shapeProps.fillPatternOffsetX +
                  offsetArray[offset].x,
            fillPatternOffsetY:
              offset === null
                ? 0
                : nodes[select].shapeProps.fillPatternOffsetY +
                  offsetArray[offset].y,
          },
        })
      );
    }
  };

  return (
    <>
      <button
        onClick={() => {
          shapeChange("RECT");
        }}
      >
        사각형
      </button>
      <button
        onClick={() => {
          shapeChange("HEART");
        }}
      >
        하트
      </button>
      <button
        onClick={() => {
          shapeChange("APPLE");
        }}
      >
        사과
      </button>
      <div>
        <button
          onClick={() => {
            offsetChange(0);
          }}
        >
          오른쪽
        </button>
        <button
          onClick={() => {
            offsetChange(1);
          }}
        >
          왼쪽
        </button>
        <button
          onClick={() => {
            offsetChange(2);
          }}
        >
          위
        </button>
        <button
          onClick={() => {
            offsetChange(3);
          }}
        >
          아래
        </button>
        <button
          onClick={() => {
            offsetChange(null);
          }}
        >
          원래대로
        </button>
      </div>
    </>
  );
}
