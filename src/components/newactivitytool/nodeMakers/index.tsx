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
import { TextEditor } from "../style";
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
} from "../types";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import { BIG, MIDIUM } from "../sideButtons/types";
import RecordMaker from "./record";
import TextMaker from "./text";
import { IsSelected } from "./functions";
import StickerMaker from "./sticker";
import PhotoMaker from "./photo";

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

  useEffect(() => {
    if (IsSelected(index) && trRef) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [IsSelected(index)]);

  switch (type) {
    case RECORD:
      return <RecordMaker shapeProps={shapeProps} />;
    case TEXT:
      return (
        <TextMaker
          shapeProps={shapeProps}
          index={index}
          shapeRef={shapeRef}
          trRef={trRef}
        />
      );
    case STICKER:
      return (
        <StickerMaker
          shapeProps={shapeProps}
          index={index}
          shapeRef={shapeRef}
          trRef={trRef}
        />
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
        <PhotoMaker
          shapeProps={shapeProps}
          index={index}
          shapeRef={shapeRef}
          trRef={trRef}
        />
      );
  }

  return <></>;
}
