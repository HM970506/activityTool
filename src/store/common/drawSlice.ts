import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CRAYON } from "../../components/newactivitytool/types";

const DEFAULT = {
  now: CRAYON,
  crayon: null,
  highlighter: null,
  spray: null,
  eraser: null,
};

const drawSlice = createSlice({
  name: "drawReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    setting: (state, action: PayloadAction<any>) => {
      const { name, brush, color } = action.payload;
      (state as any)[name] = { brush: brush, width: 10, color: color };
    },
    setNow: (state, action: PayloadAction<any>) => {
      state.now = action.payload;
    },
    setBrush: (
      state,
      action: PayloadAction<{
        name: string;
        color: string | undefined;
        //     width: number | undefined;
      }>
    ) => {
      const { name, color } = action.payload;
      if (color) (state as any)[name].color = color;
      //if (width) (state as any)[name].width = width;
    },
  },
});

export const drawActions = drawSlice.actions;
export default drawSlice.reducer;
