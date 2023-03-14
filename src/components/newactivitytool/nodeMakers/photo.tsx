import { Circle, Group, Path, Rect, Transformer } from "react-konva";
import { Html, useImage } from "react-konva-utils";

import DeleteButton from "./common/deleteButton";
import { FRAMES } from "./sample";
import { MakerType } from "../types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { OffsetBarX, OffsetBarY } from "../style";

export default function PhotoMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  onSelect,
}: MakerType) {
  const [image] = useImage(
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
  );
  const isDrawing = useSelector((state: any) => state.drawReducer.isDrawing);
  //좌표 재계산은 에바. tr을 기준으로 좌표를 찾을 수 있게해야하는ㄴ데...
  const dispatch = useDispatch();

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: {
          fillPatternOffsetX: -offsetX,
        },
      })
    );
  }, [offsetX]);

  useEffect(() => {
    dispatch(
      nodeActions.modifyNodes({
        index: index,
        modifyProps: {
          fillPatternOffsetY: offsetY,
        },
      })
    );
  }, [offsetY]);

  const onchangeX = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseInt(e.target.value));
  };

  const onchangeY = (e: ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseInt(e.target.value));
  };

  return (
    <>
      <Group
        draggable={!isDrawing}
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onSelect}
        x={shapeProps.x}
        y={shapeProps.y}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      >
        {shapeProps.frame === "RECT" ? (
          <Rect
            scaleX={1}
            scaleY={1}
            ref={shapeRef}
            fillPatternOffsetX={0}
            fillPatternOffsetY={0}
            fillPatternImage={image}
            width={image?.width}
            height={image?.height}
            onTransform={(e) => {
              onChange({
                ...shapeProps,
                width: e.target.scaleX() * e.target.width(),
                height: e.target.scaleY() * e.target.width(),
              });
            }}
          />
        ) : (
          <Path
            data={FRAMES.get(shapeProps.frame)}
            scaleX={1}
            scaleY={1}
            ref={shapeRef}
            fillPatternOffsetX={0}
            fillPatternOffsetY={0}
            fillPatternImage={image}
            width={image?.width}
            height={image?.height}
            onTransform={(e) => {
              onChange({
                ...shapeProps,
                width: e.target.scaleX() * e.target.width(),
                height: e.target.scaleY() * e.target.width(),
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
              x={
                shapeRef.current?.x() +
                shapeRef.current?.width() * shapeRef.current?.scaleX()
              }
              y={shapeRef.current?.y()}
            />
            <Html
              groupProps={{
                position: "absolute",
                x: window.innerWidth,
                y: window.innerHeight,
              }}
            >
              <OffsetBarX
                length={shapeProps.width * shapeProps.fillPatternOffsetX}
                type="range"
                defaultValue={offsetX}
                min="-100"
                max="100"
                onChange={onchangeX}
              />
            </Html>
            <Html
              groupProps={{
                position: "absolute",
                x: window.innerWidth - shapeProps.x * shapeProps.scaleX - 50,
                y: window.innerHeight - shapeProps.y * shapeProps.scaleY + 100,
              }}
            >
              <OffsetBarY
                length={shapeProps.width * shapeProps.fillPatternOffsetY}
                type="range"
                defaultValue={offsetY}
                min="-100"
                max="100"
                onChange={onchangeY}
              />
            </Html>
          </>
        )}
      </Group>
    </>
  );
}
