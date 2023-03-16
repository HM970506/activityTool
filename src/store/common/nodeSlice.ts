import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: { canvas: "" },

  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload;
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
