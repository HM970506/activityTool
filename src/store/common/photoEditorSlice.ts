import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";

const DEFAULT = {
  isEditing: false,
  photo: null,
  photoCanvas: null,
  cropCanvas: null,
  isCroping: true,
};
const photoEditorSlice = createSlice({
  name: "photoEditorReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },

    setPhoto: (state, action: PayloadAction<any>) => {
      state.photo = action.payload;
    },
    setIsCroping: (state, action: PayloadAction<boolean>) => {
      state.isCroping = action.payload;
    },

    setPhotoCanvas: (state, action: PayloadAction<canvasType>) => {
      state.photoCanvas = action.payload;
    },
    setCropCanvas: (state, action: PayloadAction<canvasType>) => {
      state.cropCanvas = action.payload;
    },
  },
});

export const photoEditorActions = photoEditorSlice.actions;
export default photoEditorSlice.reducer;
