import { Circle, Group, Path, Rect, Transformer } from "react-konva";
import { Html, useImage } from "react-konva-utils";

import DeleteButton from "./common/deleteButton";
import { FRAMES } from "./sample";
import { MakerType } from "../types";
import { useState } from "react";

export default function PhotoMaker({
  shapeProps,
  index,
  shapeRef,
  trRef,
  onChange,
  isSelected,
  isNotDrawing,
  onSelectCheck,
}: MakerType) {
  const [image] = useImage(
    "https://i.pinimg.com/564x/56/46/08/564608c8a6094dce93e1dcf4addb7130.jpg"
  );

  //좌표 재계산은 에바. tr을 기준으로 좌표를 찾을 수 있게해야하는ㄴ데...

  return (
    <>
      <Group
        draggable={isNotDrawing}
        onClick={onSelectCheck}
        onTap={onSelectCheck}
        onDragStart={onSelectCheck}
        onTransform={(e) => {
          onChange({
            ...shapeProps,
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
          });
        }}
      >
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
            width={image?.width}
            height={image?.height}
          />
        ) : (
          <Path
            data={FRAMES.get(shapeProps.frame)}
            onClick={onSelectCheck}
            onTap={onSelectCheck}
            onDragStart={onSelectCheck}
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
        )}
        {isSelected && (
          <>
            <DeleteButton
              index={index}
              shapeProps={{
                ...shapeProps,
                width: image?.width,
                height: image?.height,
              }}
            />
            <Html
              groupProps={{
                x: window.innerWidth - shapeProps.x * shapeProps.scaleX,
                y: window.innerHeight - shapeProps.y * shapeProps.scaleY,
              }}
            >
              <input type="range" />
            </Html>
          </>
        )}
      </Group>
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
