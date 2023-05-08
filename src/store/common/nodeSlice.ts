import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: {
    canvas: null,
    isDrawing: false,
    isPanning: false,
    textareaContainer: null,
    record: undefined,
    opacity: 0,
  },

  reducers: {
    reset: (state) => {
      state = {
        canvas: null,
        isDrawing: false,
        isPanning: false,
        textareaContainer: null,
        record: undefined,
        opacity: 0,
      };
    },
    setCanvas: (state, action: PayloadAction<canvasType>) => {
      state.canvas = action.payload;
    },
    setTextareaContainer: (state, action: PayloadAction<any>) => {
      state.textareaContainer = action.payload;
    },

    setOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },
    setDraw: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },

    setPan: (state, action: PayloadAction<boolean>) => {
      state.isPanning = action.payload;
    },

    setRecord: (state, action: PayloadAction<any>) => {
      state.record = action.payload;
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
