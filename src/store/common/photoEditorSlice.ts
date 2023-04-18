import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const photoEditorSlice = createSlice({
  name: "photoEditorReducer",
  initialState: { view: true },

  reducers: {
    setView: (state, action: PayloadAction<any>) => {
      state.view = action.payload;
    },
  },
});

export const photoEditorActions = photoEditorSlice.actions;
export default photoEditorSlice.reducer;
