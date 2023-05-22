import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT = { isEditing: false, photo: null };
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
  },
});

export const photoEditorActions = photoEditorSlice.actions;
export default photoEditorSlice.reducer;
