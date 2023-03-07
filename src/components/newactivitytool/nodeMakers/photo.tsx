import { Circle, Path, Rect, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { OnSelect, OnChange, IsSelected } from "./functions";
import { FRAMES } from "./sample";
import { PhotoType } from "./types";

export default function PhotoMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
}: PhotoType) {
  const dispatch = useDispatch();
  const [image] = useImage(
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
  );

  if (shapeProps.frame == "RECT")
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
          fillPatternImage={image}
          onDragEnd={(e) => {
            OnChange(index, {
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          width={image?.width}
          height={image?.height}
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
  else
    return (
      <>
        <Path
          data={FRAMES.get(shapeProps.frame)}
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
          fillPatternImage={image}
          onDragEnd={(e) => {
            OnChange(index, {
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />
        {IsSelected(index) && (
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
