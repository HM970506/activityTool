import { Circle, Group, Path, Rect, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import DeleteButton from "./common/deleteButton";
import { FRAMES } from "./sample";
import { MakerType } from "./types";

export default function PhotoMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onSelect,
  onChange,
  isSelected,
}: MakerType) {
  const [image] = useImage(
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
  );

  return (
    <Group draggable onClick={onSelect} onTap={onSelect} onDragStart={onSelect}>
      {shapeProps.frame === "RECT" ? (
        <Rect
          ref={shapeRef}
          {...shapeProps}
          fillPatternImage={image}
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
          width={image?.width}
          height={image?.height}
        />
      ) : (
        <Path
          data={FRAMES.get(shapeProps.frame)}
          onClick={onSelect}
          onTap={onSelect}
          onDragStart={onSelect}
          ref={shapeRef}
          draggable
          {...shapeProps}
          fillPatternImage={image}
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
      )}
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              else return newBox;
            }}
          />
          <DeleteButton
            index={index}
            shapeProps={{
              ...shapeProps,
              width: image?.width,
              height: image?.height,
            }}
          />
        </>
      )}
    </Group>
  );
}
