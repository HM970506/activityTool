import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload;
    },
    setTextareaContainer: (state, action: PayloadAction<any>) => {
      state.textareaContainer = action.payload;
    },

    setOpacity: (state, action: PayloadAction<any>) => {
      state.opacity = action.payload;
    },
    setDraw: (state, action: PayloadAction<any>) => {
      state.isDrawing = action.payload;
    },

    setPan: (state, action: PayloadAction<any>) => {
      state.isPanning = action.payload;
    },

    setRecord: (state, action: PayloadAction<any>) => {
      state.record = action.payload;
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
