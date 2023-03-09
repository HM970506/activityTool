import { useEffect, useState } from "react";
import { Circle, Group, Rect, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import DeleteButton from "./common/deleteButton";
import { MakerType } from "./types";

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
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) return oldBox;
              else return newBox;
            }}
          />
          <DeleteButton index={index} shapeProps={shapeProps} />
        </>
      )}
    </Group>
  );
}
