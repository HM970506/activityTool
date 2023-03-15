import DeleteButton from "./common/deleteButton";
import { FRAMES } from "./sample";
import { MakerType } from "../types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { OffsetBarX, OffsetBarY } from "../style";

export default function PhotoMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  onSelect,
}: MakerType) {
  const isDrawing = useSelector((state: any) => state.drawReducer.isDrawing);
  //좌표 재계산은 에바. tr을 기준으로 좌표를 찾을 수 있게해야하는ㄴ데...
  const dispatch = useDispatch();

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: {
          fillPatternOffsetX: -offsetX,
        },
      })
    );
  }, [offsetX]);

  useEffect(() => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: {
          fillPatternOffsetY: offsetY,
        },
      })
    );
  }, [offsetY]);

  const onchangeX = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseInt(e.target.value));
  };

  const onchangeY = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseInt(e.target.value));
  };

  return (
    <>
      <OffsetBarX
        length={shapeProps.width * shapeProps.fillPatternOffsetX}
        type="range"
        defaultValue={offsetX}
        min="-100"
        max="100"
        onChange={onchangeX}
      />

      <OffsetBarY
        length={shapeProps.width * shapeProps.fillPatternOffsetY}
        type="range"
        defaultValue={offsetY}
        min="-100"
        max="100"
        onChange={onchangeY}
      />
    </>
  );
}
