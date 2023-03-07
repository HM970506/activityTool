import { Circle, Group, Rect, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "./types";

export default function StickerMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onSelect,
  onChange,
  isSelected,
}: MakerType) {
  return (
    <Group draggable onClick={onSelect} onTap={onSelect} onDragStart={onSelect}>
      <Rect
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransform={(e) => {
          onChange({
            ...shapeProps,
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
          });
        }}
      />
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              else return newBox;
            }}
          />
          <DeleteButton index={index} shapeProps={shapeProps} />
        </>
      )}
    </Group>
  );
}
