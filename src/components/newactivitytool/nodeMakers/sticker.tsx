import { useEffect, useState } from "react";
import { Circle, Group, Rect, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "../types";

export default function StickerMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  isNotDrawing,
  onSelectCheck,
}: MakerType) {
  const [image] = useImage(shapeProps.stickerCategory);

  return (
    <Group
      draggable={isNotDrawing}
      onClick={onSelectCheck}
      onTap={onSelectCheck}
      onDragStart={onSelectCheck}
    >
      <Rect
        ref={shapeRef}
        {...shapeProps}
        fillPatternImage={image}
        width={image?.width}
        height={image?.height}
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
            width: e.target.scaleX() * e.target.width(),
            height: e.target.scaleY() * e.target.width(),
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
          <DeleteButton
            index={index}
            x={
              shapeRef.current?.x() +
              shapeRef.current?.width() * shapeRef.current?.scaleX()
            }
            y={shapeRef.current?.y()}
          />
        </>
      )}
    </Group>
  );
}
