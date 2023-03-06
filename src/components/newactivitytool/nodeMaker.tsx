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
  RECORD,
  STICKER,
  TEXT,
  TransformerType,
} from "./types";
import { nodeActions } from "../../store/common/nodeSlice";
import { selectActions } from "../../store/common/selectSlice";
import { BIG, MIDIUM } from "./sideButtons/types";

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
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
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
    case RECORD:
      let record_x = shapeProps.x - 5;
      let record_y = shapeProps.y - 10;
      console.log(shapeProps);
      return (
        <Html groupProps={{ record_x, record_y }}>
          <audio src={shapeProps.audioSrc} controls={true} />
        </Html>
      );
    case TEXT:
      let x = shapeProps.x - 5;
      let y = shapeProps.y - 10;
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
      else if (shapeProps.frame == "APPLE")
        return (
          <>
            <Path
              data={
                "M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z"
              }
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

  return <></>;
}
