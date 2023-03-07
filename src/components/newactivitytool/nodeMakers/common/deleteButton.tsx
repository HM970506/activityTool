import { Circle } from "react-konva";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { selectActions } from "../../../../store/common/selectSlice";

export default function DeleteButton({
  shapeProps,
  index,
}: {
  shapeProps: any;
  index: number;
}) {
  const dispatch = useDispatch();
  return (
    <Circle
      fill={"red"}
      radius={10}
      x={shapeProps.x + shapeProps.scaleX * shapeProps.width + 15}
      y={shapeProps.y - 15}
      onClick={() => {
        dispatch(selectActions.selectChange(null));
        dispatch(nodeActions.removeNodes(index));
      }}
    />
  );
}
