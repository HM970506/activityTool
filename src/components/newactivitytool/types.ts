import { RefObject } from "react";

export interface MakerType {
  shapeProps: any;
  index: number;
  shapeRef: RefObject<any>;
  onChange: any;
  isSelected: boolean;
  onSelect: any;
}

export interface NodeMakerType {
  index: number;
  type: NodeType;
  shapeProps: any;
}

export const STICKER = "STICKER";
export const TEXT = "TEXT";
export const PEN = "PEN";
export const ERASER = "ERASER";
export const BRUSH = "BRUSH";
export const PHOTO = "PHOTO";
export const RECORD = "RECORD";
export const DRAWTOOLS = "DRAWTOOLS";
export type NodeType =
  | "STICKER"
  | "TEXT"
  | "PEN"
  | "ERASER"
  | "BRUSH"
  | "PHOTO"
  | "RECORD"
  | "DRAWTOOLS";

export interface drawPenType {
  tool: string;
  color: string;
  size: number;
}

export const BIG = 30;
export const MIDIUM = 25;
export const SMALL = 20;
