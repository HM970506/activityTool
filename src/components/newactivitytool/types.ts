import Konva from "konva";
import { RefObject } from "react";

export type cursorMove =
  | Konva.KonvaEventObject<TouchEvent>
  | Konva.KonvaEventObject<MouseEvent>;

export interface MakerType {
  shapeProps: any;
  index: number;
  shapeRef: RefObject<any>;
  trRef: RefObject<TransformerType>;
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

export type TransformerType = Konva.Transformer;

export interface drawPenType {
  tool: string;
  color: string;
  size: number;
}

export const BIG = 25;
export const MIDIUM = 20;
export const SMALL = 15;
