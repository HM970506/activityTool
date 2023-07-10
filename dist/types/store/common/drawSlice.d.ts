import { PayloadAction } from "@reduxjs/toolkit";
export declare const drawActions: import("@reduxjs/toolkit").CaseReducerActions<{
    reset: (state: import("immer/dist/internal").WritableDraft<{
        now: null;
        feltpen: null;
        crayon: null;
        backgroundBrush: null;
        highlighter: null;
        spray: null;
        eraser: null;
        ink: null;
    }>) => void;
    setting: (state: import("immer/dist/internal").WritableDraft<{
        now: null;
        feltpen: null;
        crayon: null;
        backgroundBrush: null;
        highlighter: null;
        spray: null;
        eraser: null;
        ink: null;
    }>, action: PayloadAction<any>) => void;
    setNow: (state: import("immer/dist/internal").WritableDraft<{
        now: null;
        feltpen: null;
        crayon: null;
        backgroundBrush: null;
        highlighter: null;
        spray: null;
        eraser: null;
        ink: null;
    }>, action: PayloadAction<any>) => void;
    setBrush: (state: import("immer/dist/internal").WritableDraft<{
        now: null;
        feltpen: null;
        crayon: null;
        backgroundBrush: null;
        highlighter: null;
        spray: null;
        eraser: null;
        ink: null;
    }>, action: PayloadAction<{
        name: string;
        color: string | undefined;
        width: number | undefined;
    }>) => void;
}, "drawReducer">;
declare const _default: import("redux").Reducer<{
    now: null;
    feltpen: null;
    crayon: null;
    backgroundBrush: null;
    highlighter: null;
    spray: null;
    eraser: null;
    ink: null;
}, import("redux").AnyAction>;
export default _default;
