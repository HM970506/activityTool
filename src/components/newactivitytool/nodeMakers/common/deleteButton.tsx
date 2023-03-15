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
  return <></>;
}
