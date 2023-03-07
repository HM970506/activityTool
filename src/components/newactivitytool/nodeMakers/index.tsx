import { useEffect, useRef, useState } from "react";
import {
  BRUSH,
  ERASER,
  NodeMakerType,
  NodeType,
  PEN,
  PHOTO,
  RECORD,
  STICKER,
  TEXT,
  TransformerType,
} from "./types";
import RecordMaker from "./record";
import TextMaker from "./text";
import { IsSelected } from "./functions";
import StickerMaker from "./sticker";
import PhotoMaker from "./photo";
import ToolsMaker from "./tools";

export default function Node({ index, type, shapeProps }: NodeMakerType) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<TransformerType>(null);
  const props = {
    shapeProps: shapeProps,
    index: index,
    shapeRef: shapeRef,
    trRef: trRef,
  };

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
      return <TextMaker {...props} />;
    case STICKER:
      return <StickerMaker {...props} />;
    case PHOTO:
      return <PhotoMaker {...props} />;
  }
  return <ToolsMaker type={type} shapeProps={shapeProps} />;
}
