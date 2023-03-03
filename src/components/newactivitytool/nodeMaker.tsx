import { useEffect, useRef, useState } from "react";
import { Rect, Transformer, Text, Line } from "react-konva";
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

export default function Node({
  index,
  type,
  shapeProps,
  isSelected,
  onSelect,
}: {
  index: number;
  type: NodeType;
  shapeProps: any;
  isSelected: boolean;
  onSelect: any;
}) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<TransformerType>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const nodes = useSelector((state: any) => state.nodeReducer.nodes);
  const dispatch = useDispatch();

  const [dbclick, setDbClick] = useState<boolean>(false);

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

  switch (type) {
    case TEXT:
      const x = nodes[index].shapeProps.x - 5;
      const y = nodes[index].shapeProps.y - 10;
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
