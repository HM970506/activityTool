import { Circle, Rect, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
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
  const dispatch = useDispatch();
  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onSelect}
        ref={shapeRef}
        draggable
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
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
          <Circle
            fill={"red"}
            radius={10}
            x={shapeProps.x + shapeProps.width + 15}
            y={shapeProps.y - 15}
            onClick={() => {
              dispatch(selectActions.selectChange(null));
              dispatch(nodeActions.removeNodes(index));
            }}
          />
        </>
      )}
    </>
  );
}
