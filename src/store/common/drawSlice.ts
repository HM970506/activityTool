import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const drawSlice = createSlice({
  name: "drawReducer",
  initialState: { tool: "", color: "black", size: 5 },

  reducers: {
    toolChange: (state, action: PayloadAction<any>) => {
      state.tool = action.payload;
      console.log(JSON.stringify(state));
    },
    colorChange: (state, action: PayloadAction<any>) => {
      state.color = action.payload;
      console.log(JSON.stringify(state));
    },
    sizeChange: (state, action: PayloadAction<any>) => {
      state.size = action.payload;
      console.log(JSON.stringify(state));
    },
  },
});

export const drawActions = drawSlice.actions;
export default drawSlice.reducer;
