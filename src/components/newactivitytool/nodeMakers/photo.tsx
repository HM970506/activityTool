import { Circle, Path, Rect, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
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
  const dispatch = useDispatch();
  const [image] = useImage(
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
  );

  if (shapeProps.frame == "RECT")
    return (
      <>
        <Rect
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
          width={image?.width}
          height={image?.height}
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
  else
    return (
      <>
        <Path
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
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              else return newBox;
            }}
          />
        )}
      </>
    );
}
