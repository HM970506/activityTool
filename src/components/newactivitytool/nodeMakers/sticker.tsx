import DeleteButton from "./common/deleteButton";
import { MakerType } from "../types";
import { useSelector } from "react-redux";

export default function StickerMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  onSelect,
}: MakerType) {
  const isDrawing = useSelector((state: any) => state.drawReducer.isDrawing);

  return <></>;
}
