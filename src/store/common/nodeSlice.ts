import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: { canvas: null },

  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload;
      //console.log(JSON.stringify(action.payload));
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
