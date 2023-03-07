import Konva from "konva";

export interface MakerType {
  shapeProps: any;
  index: number;
  shapeRef: any;
  trRef: any;
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
export type NodeType =
  | "STICKER"
  | "TEXT"
  | "PEN"
  | "ERASER"
  | "BRUSH"
  | "PHOTO"
  | "RECORD";

export type TransformerType = Konva.Transformer;

export interface drawPenType {
  tool: string;
  color: string;
  size: number;
}
