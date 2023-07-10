import { PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";
export declare const photoEditorActions: import("@reduxjs/toolkit").CaseReducerActions<{
    reset: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>) => void;
    setIsEditing: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>, action: PayloadAction<boolean>) => void;
    setPhoto: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>, action: PayloadAction<any>) => void;
    setIsCroping: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>, action: PayloadAction<boolean>) => void;
    setPhotoCanvas: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>, action: PayloadAction<canvasType>) => void;
    setCropCanvas: (state: import("immer/dist/internal").WritableDraft<{
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    }>, action: PayloadAction<canvasType>) => void;
}, "photoEditorReducer">;
declare const _default: import("redux").Reducer<{
    isEditing: boolean;
    photo: null;
    photoCanvas: null;
    cropCanvas: null;
    isCroping: boolean;
}, import("redux").AnyAction>;
export default _default;
