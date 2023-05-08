import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const photoEditorSlice = createSlice({
  name: "photoEditorReducer",
  initialState: { isEditing: false, photo: null },

  reducers: {
    reset: (state) => {
      state = { isEditing: false, photo: null };
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
