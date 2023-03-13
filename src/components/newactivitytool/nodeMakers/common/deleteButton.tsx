import { Circle } from "react-konva";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { selectActions } from "../../../../store/common/selectSlice";

export default function DeleteButton({
  x,
  y,
  index,
}: {
  x: number;
  y: number;
  index: number;
}) {
  const dispatch = useDispatch();
  return (
    <Circle
      fill={"red"}
      x={x + 20}
      y={y - 20}
      radius={10}
      onClick={() => {
        dispatch(selectActions.selectChange(null));
        dispatch(nodeActions.removeNodes(index));
      }}
    />
  );
}
