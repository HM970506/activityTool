import { useEffect, useRef, useState } from "react";
import {
  Rect,
  Transformer,
  Text,
  Line,
  Circle,
  Shape,
  Path,
} from "react-konva";
import { Html, useImage } from "react-konva-utils";
import { useDispatch, useSelector } from "react-redux";
import { TextEditor } from "./style";
import {
  BRUSH,
  ERASER,
  NodeType,
  PEN,
  PHOTO,
  STICKER,
  TEXT,
  TransformerType,
} from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import { selectActions } from "../../store/common/selectSlice";

export default function Node({
  index,
  type,
  shapeProps,
}: {
  index: number;
  type: NodeType;
  shapeProps: any;
}) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<TransformerType>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);
  const dispatch = useDispatch();

  const nowSelect = useSelector((state: any) => state.selectReducer.select);
  const isSelected = nowSelect === index ? true : false;

  const [dbclick, setDbClick] = useState<boolean>(false);
  const [image] = useImage(
    "https://i.pinimg.com/564x/e2/5a/fc/e25afc5f25330d9811e669057c6ed4a8.jpg"
  );
  const onChange = (newAttr: any) => {
    dispatch(nodeActions.modifyNodes({ index: index, modifyProps: newAttr }));
  };

  const onEdit = async () => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: { text: textRef.current?.value },
      })
    );
    await shapeRef.current.show(); //show 이후에 dispatch가 반영된다. await를 써도 안 됨.
    setDbClick(false);
  };

  useEffect(() => {
    if (isSelected && trRef) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const onSelect = () => {
    dispatch(selectActions.selectChange(index));
  };

  switch (type) {
    case TEXT:
      const x = shapeProps.x - 5;
      const y = shapeProps.y - 10;
      return (
        <>
          <Text
            draggable
            onClick={onSelect}
            onDblClick={() => {
              shapeRef.current.hide();
              trRef.current?.hide();
              setDbClick(true);
            }}
            onTap={onSelect}
            onDragStart={onSelect}
            onDragEnd={(e) => {
              onChange({
                ...shapeProps,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
            ref={shapeRef}
            {...shapeProps}
          />
          {isSelected && <Transformer ref={trRef} />}
          {dbclick && (
            <Html groupProps={{ x, y }}>
              <TextEditor
                autoFocus
                ref={textRef}
                size={shapeProps.fontSize}
                defaultValue={shapeProps.text}
                onBlur={onEdit}
              />
            </Html>
          )}
        </>
      );
    case STICKER:
      return (
        <>
          <Rect
            onClick={onSelect}
            onTap={onSelect}
            onDragStart={onSelect}
            ref={shapeRef}
            draggable
            {...shapeProps}
            fill={"white"}
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
            </>
          )}
        </>
      );
    case PEN:
      return (
        <Line
          tension={0.1}
          {...shapeProps}
          fill={"none"}
          lineCap="round"
          globalCompositeOperation="source-over"
        />
      );
    case BRUSH:
      return (
        <Line
          tension={0.1}
          lineCap="round"
          globalCompositeOperation="source-over"
          {...shapeProps}
        />
      );
    case ERASER:
      return (
        <Line
          tension={0.5}
          lineCap="round"
          globalCompositeOperation="destination-out"
          {...shapeProps}
        />
      );

    case PHOTO:
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
      else if (shapeProps.frame == "HEART")
        return (
          <>
            <Path
              data={
                "M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z"
              }
              onClick={onSelect}
              onTap={onSelect}
              onDragStart={onSelect}
              ref={shapeRef}
              draggable
              {...shapeProps}
              fillPatternImage={image}
              fillPatternOffset={{
                x: image?.width! / 4,
                y: image?.height! / 4,
              }}
              onDragEnd={(e) => {
                onChange({
                  ...shapeProps,
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
              scaleX={1}
              scaleY={1}
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

  return <></>;
}
