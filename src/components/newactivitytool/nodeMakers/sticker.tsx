import { Circle, Rect, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { IsSelected, OnChange, OnSelect } from "./functions";
import { StickerType } from "./types";

export default function StickerMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
}: StickerType) {
  const dispatch = useDispatch();
  return (
    <>
      <Rect
        onClick={() => {
          OnSelect(index);
        }}
        onTap={() => {
          OnSelect(index);
        }}
        onDragStart={() => {
          OnSelect(index);
        }}
        ref={shapeRef}
        draggable
        {...shapeProps}
        fill={"white"}
        onDragEnd={(e) => {
          OnChange(index, {
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {IsSelected(index) && (
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
