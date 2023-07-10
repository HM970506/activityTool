import { PayloadAction } from "@reduxjs/toolkit";
export declare const zoomActions: import("@reduxjs/toolkit").CaseReducerActions<{
    reset: (state: import("immer/dist/internal").WritableDraft<{
        zoom: number;
        zoomView: number;
        scale: number;
    }>) => void;
    setZoom: (state: import("immer/dist/internal").WritableDraft<{
        zoom: number;
        zoomView: number;
        scale: number;
    }>, action: PayloadAction<number>) => void;
    setView: (state: import("immer/dist/internal").WritableDraft<{
        zoom: number;
        zoomView: number;
        scale: number;
    }>, action: PayloadAction<number>) => void;
    setScale: (state: import("immer/dist/internal").WritableDraft<{
        zoom: number;
        zoomView: number;
        scale: number;
    }>, action: PayloadAction<number>) => void;
}, "zoomReducer">;
declare const _default: import("redux").Reducer<{
    zoom: number;
    zoomView: number;
    scale: number;
}, import("redux").AnyAction>;
export default _default;
