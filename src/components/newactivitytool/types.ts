import {
  Image,
  Object,
  IEvent,
  PencilBrush,
  SprayBrush,
  PatternBrush,
  BaseBrush,
} from "fabric/fabric-impl";

export type fabricObjectType = Object;

export interface panObjectType extends Partial<Object> {
  prevEvented: boolean | undefined;
  prevSelectable: boolean | undefined;
}

export interface fabricEventType extends Partial<IEvent> {
  e: Event;
}

export interface ImageType extends Partial<Image> {
  erasable: boolean;
  objectType?: string;
  original?: string;
}

export const STICKER = "STICKER";
export const TEXT = "TEXT";

export const BRUSH = "BRUSH";
export const PHOTO = "PHOTO";
export const RECORD = "RECORD";
export const DRAWTOOLS = "DRAWTOOLS";
export const DECORATION = "DECORATION";

export const PENCIL = "pencil";
export const FELTPEN = "feltpen";
export const BACKGROUND_BRUSH = "backgroundBrush";
export const CRAYON = "crayon";
export const SPRAY = "spray";
export const HIGHLIGHTER = "highlighter";
export const ERASER = "eraser";
export const INK = "ink";

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

export interface subcategoryType {
  template: { index: number; state: boolean };
  tape: { index: number; state: boolean; color: string };
  stamp: { index: number; state: boolean; color: string };
}

export interface categoryReducerType {
  category: string;
  subcategory: subcategoryType;
  view: boolean;
  option: boolean;
}

export interface tapeStateType {
  opacity: number;
  size: number;
}

export type canvasType = any;

export interface nodeReducerType {
  canvas: canvasType;
  isEditing: boolean;
  isPanning: boolean;
  opacity: number;
  record: any;
  textareaContainer: HTMLDivElement;
  dialogContainer: HTMLDialogElement;
  history: { undo: number; redo: number };
}

export interface zoomReducerType {
  scale: number;
  zoom: number;
  zoomView: number;
}

export interface photoEditorReducerType {
  isEditing: boolean;
  photo: null | ImageType;
}

export interface ReducersType {
  categoryReducer: categoryReducerType;
  nodeReducer: nodeReducerType;
  zoomReducer: zoomReducerType;
  photoEditorReducer: photoEditorReducerType;
  drawReducer: any;
}

export const DEFAULT_X = 500;
export const DRAW_SIZE = 5;

export const DEFAULT_STAMP =
  '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M169.859 571Q132 571 106 544.859t-26-64Q80 443 106.141 417t64-26Q208 391 234 417.141t26 64Q260 519 233.859 545t-64 26Zm185-170Q317 401 291 374.859t-26-64Q265 273 291.141 247t64-26Q393 221 419 247.141t26 64Q445 349 418.859 375t-64 26Zm250 0Q567 401 541 374.859t-26-64Q515 273 541.141 247t64-26Q643 221 669 247.141t26 64Q695 349 668.859 375t-64 26Zm185 170Q752 571 726 544.859t-26-64Q700 443 726.141 417t64-26Q828 391 854 417.141t26 64Q880 519 853.859 545t-64 26ZM266 981q-42 0-69-31.526T170 875q0-42 25.5-74.5T250 738q22-22 41-46.5t36-50.5q29-44 65-82t88-38q52 0 88.5 38t65.5 83q17 26 35.5 50t40.5 46q29 30 54.5 62.5T790 875q0 42.948-27 74.474Q736 981 694 981q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z"/></svg>';

export const DEFAULT_CANVAS = {
  backgroundColor: "rgba(255,255,255,0)",
  preserveObjectStacking: true,
  selection: false,
  tape: { state: 0, size: 10, color: "black" },
  panning: 0,
  stamp: { state: 0, shape: "", color: "black" },
  skipOffscreen: true,
  allowTouchScrolling: true,
  deltaX: 0,
  deltaY: 0,
  lastClientX: 0,
  lastClientY: 0,
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
  CrossOrigin: undefined | string;
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

export interface textType {
  name: string;
  url: string;
}

export interface drawType {
  tool: string;
  color: string;
  size: number;
}
