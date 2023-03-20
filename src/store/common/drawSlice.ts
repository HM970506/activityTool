import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PEN } from "../../components/newactivitytool/types";

const drawSlice = createSlice({
  name: "drawReducer",
  initialState: { isDrawing: false, tool: "pen", color: "black", size: 5 },

  reducers: {
    draw: (state) => {
      state.isDrawing = true;
    },
    undraw: (state) => {
      state.isDrawing = false;
    },
    toolChange: (state, action: PayloadAction<any>) => {
      state.tool = action.payload;
    },
    colorChange: (state, action: PayloadAction<any>) => {
      state.color = action.payload;
    },
    sizeChange: (state, action: PayloadAction<any>) => {
      state.size = action.payload;
    },
  },
});

export const drawActions = drawSlice.actions;
export default drawSlice.reducer;
