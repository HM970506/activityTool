import { RefObject } from "react";

export interface MakerType {
  shapeProps: any;
  index: number;
  shapeRef: RefObject<any>;
  onChange: any;
  isSelected: boolean;
  onSelect: any;
}

export const STICKER = "STICKER";
export const TEXT = "TEXT";
export const PEN = "PEN";
export const ERASER = "ERASER";
export const BRUSH = "BRUSH";
export const PHOTO = "PHOTO";
export const RECORD = "RECORD";
export const DRAWTOOLS = "DRAWTOOLS";
export const DECORATION = "DECORATION";

export interface drawPenType {
  tool: string;
  color: string;
  size: number;
}

export const BIG = 30;
export const MIDIUM = 25;
export const SMALL = 20;

export const COLORS = [
  "black",
  "blue",
  "red",
  "pink",
  "purple",
  "grey",
  "green",
  "yellow",
  "skyblue",
  "white",
];

export const STICKER_CATEGORY = [
  { id: "fluffy", name: "인형" },
  { id: "object", name: "인형아님" },
];
