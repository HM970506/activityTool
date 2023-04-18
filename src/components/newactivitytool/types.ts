import { Image } from "fabric/fabric-impl";

export interface ImageType extends Partial<Image> {
  erasable: boolean;
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

export const PENCIL = "pencil";
export const BACKGROUND_BRUSH = "backgroundBrush";
export const SPRAY = "spray";

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

export interface stickerCategoryType {
  id: string;
  name: string;
}

export interface subcategoryInnerType {
  index: number;
  state: boolean;
}

export interface tapeType extends Partial<subcategoryInnerType> {
  opacity: 0;
}

export interface subcategoryType {
  template: subcategoryInnerType;
  tape: tapeType;
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

export interface CanvasType extends Partial<any> {
  taping: number;
  stamping: string;
  toolColor: string;
  tapeState: any;
}

export interface nodeReducerType {
  canvas: any;
  isDrawing: boolean;
  isPanning: boolean;
  opacity: number;
  record: string | null;
  textareaContainer: HTMLDivElement;
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

export const DRAW_SIZE = 5;

export const DEFAULT_CANVAS = {
  backgroundColor: "rgba(255,255,255,0)",
  preserveObjectStacking: true,
  selection: false,
  taping: 0,
  panning: 0,
  stamping: -1,
  skipOffscreen: true,
  allowTouchScrolling: true,
  deltaX: 0,
  deltaY: 0,
  lastClientX: 0,
  lastClientY: 0,
  tapeState: {
    size: 20,
    opacity: 0.5,
  },
  toolColor: "black",
};

export const DEFUALT_TEXTBOX = {
  color: "black",
  width: 400,
  height: 30,
  editable: true,
  fontSize: 30,
  selectable: true,
};

export interface textType {
  name: string;
  url: string;
}

export interface stickerOptionType {
  crossOrigin: undefined | string;
  height: number;
  minX: number;
  minY: number;
  svgUid: number;
  toBeParsed: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  width: number;
}

export interface CanvasType {}
