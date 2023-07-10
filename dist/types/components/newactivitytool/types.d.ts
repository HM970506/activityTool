import { Image, Object, IEvent } from "fabric/fabric-impl";
export interface BrushOption {
    color: string;
    width: number;
    opacity: number;
}
export interface ratioType {
    widthR: number;
    heightR: number;
}
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
export declare const STICKER = "STICKER";
export declare const TEXT = "TEXT";
export declare const BRUSH = "BRUSH";
export declare const PHOTO = "PHOTO";
export declare const RECORD = "RECORD";
export declare const DRAWTOOLS = "DRAWTOOLS";
export declare const DECORATION = "DECORATION";
export declare const PENCIL = "pencil";
export declare const FELTPEN = "feltpen";
export declare const BACKGROUND_BRUSH = "backgroundBrush";
export declare const CRAYON = "crayon";
export declare const SPRAY = "spray";
export declare const HIGHLIGHTER = "highlighter";
export declare const ERASER = "eraser";
export declare const INK = "ink";
export declare const COLORS: string[];
export declare const STICKER_CATEGORY: {
    id: string;
    name: string;
}[];
export interface stickerCategoryType {
    id: string;
    name: string;
}
export interface subcategoryType {
    template: {
        index: number;
        state: boolean;
    };
    tape: {
        index: number;
        state: boolean;
        color: string;
    };
    stamp: {
        index: number;
        state: boolean;
        color: string;
    };
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
    history: {
        undo: number;
        redo: number;
    };
}
export interface zoomReducerType {
    scale: number;
    zoom: number;
    zoomView: number;
}
export interface photoEditorReducerType {
    isEditing: boolean;
    photo: null | ImageType;
    photoCanvas: canvasType;
    cropCanvas: canvasType;
    isCroping: boolean;
}
export interface ReducersType {
    categoryReducer: categoryReducerType;
    nodeReducer: nodeReducerType;
    zoomReducer: zoomReducerType;
    photoEditorReducer: photoEditorReducerType;
    drawReducer: any;
}
export declare const DEFAULT_X = 500;
export declare const DRAW_SIZE = 5;
export declare const DEFAULT_STAMP = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"48\" viewBox=\"0 96 960 960\" width=\"48\"><path d=\"M169.859 571Q132 571 106 544.859t-26-64Q80 443 106.141 417t64-26Q208 391 234 417.141t26 64Q260 519 233.859 545t-64 26Zm185-170Q317 401 291 374.859t-26-64Q265 273 291.141 247t64-26Q393 221 419 247.141t26 64Q445 349 418.859 375t-64 26Zm250 0Q567 401 541 374.859t-26-64Q515 273 541.141 247t64-26Q643 221 669 247.141t26 64Q695 349 668.859 375t-64 26Zm185 170Q752 571 726 544.859t-26-64Q700 443 726.141 417t64-26Q828 391 854 417.141t26 64Q880 519 853.859 545t-64 26ZM266 981q-42 0-69-31.526T170 875q0-42 25.5-74.5T250 738q22-22 41-46.5t36-50.5q29-44 65-82t88-38q52 0 88.5 38t65.5 83q17 26 35.5 50t40.5 46q29 30 54.5 62.5T790 875q0 42.948-27 74.474Q736 981 694 981q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z\"/></svg>";
export declare const DEFAULT_CANVAS: {
    backgroundColor: string;
    preserveObjectStacking: boolean;
    selection: boolean;
    tape: {
        state: number;
        size: number;
        color: string;
    };
    panning: number;
    stamp: {
        state: number;
        shape: string;
        color: string;
    };
    skipOffscreen: boolean;
    allowTouchScrolling: boolean;
    deltaX: number;
    deltaY: number;
    lastClientX: number;
    lastClientY: number;
};
export declare const DEFUALT_TEXTBOX: {
    color: string;
    width: number;
    height: number;
    editable: boolean;
    fontSize: number;
    selectable: boolean;
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
export interface CanvasType {
}
export interface textType {
    name: string;
    url: string;
}
export interface drawType {
    tool: string;
    color: string;
    size: number;
}
