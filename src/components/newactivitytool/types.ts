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

export interface subcategoryInnerType {
  index: number;
  state: boolean;
}

export interface subcategoryType {
  template: subcategoryInnerType;
  tape: subcategoryInnerType;
  stamp: subcategoryInnerType;
}

export interface categoryReducerType {
  category: string;
  subcategory: subcategoryType;
  view: boolean;
}

export interface drawReducerType {
  color: string;
  size: number;
  tool: string;
}

export interface nodeReducerType {
  canvas: any;
  isDrawing: boolean;
  isPanning: boolean;
  opacity: number;
  record: string | null;
  textareaContainer: any;
}

export interface zoomReducerType {
  scale: number;
  zoom: number;
  zoomView: number;
}

export interface ReducersType {
  categoryReducer: categoryReducerType;
  drawReducer: drawReducerType;
  nodeReducer: nodeReducerType;
  zoomReducer: zoomReducerType;
}
