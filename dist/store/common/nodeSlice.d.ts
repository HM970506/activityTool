import { PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";
export declare const nodeActions: import("@reduxjs/toolkit").CaseReducerActions<{
    reset: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>) => void;
    setUndo: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<number>) => void;
    setRedo: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<number>) => void;
    setCanvas: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<canvasType>) => void;
    setTextareaContainer: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<any>) => void;
    setDialogContainer: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<any>) => void;
    setOpacity: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<number>) => void;
    setPan: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<boolean>) => void;
    setRecord: (state: import("immer/dist/internal").WritableDraft<{
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    }>, action: PayloadAction<any>) => void;
}, "nodeReducer">;
declare const _default: import("redux").Reducer<{
    canvas: null;
    isPanning: boolean;
    textareaContainer: null;
    dialogContainer: null;
    record: string;
    opacity: number;
    history: {
        undo: number;
        redo: number;
    };
}, import("redux").AnyAction>;
export default _default;
