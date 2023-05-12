import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: {
    canvas: null,
    isEditing: false,
    isPanning: false,
    textareaContainer: null,
    record: {
      old: undefined,
      new: undefined,
    },
    opacity: 0,
  },

  reducers: {
    reset: (state) => {
      state = {
        canvas: null,
        isEditing: false,
        isPanning: false,
        textareaContainer: null,
        record: {
          old: undefined,
          new: undefined,
        },
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

    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },

    setPan: (state, action: PayloadAction<boolean>) => {
      state.isPanning = action.payload;
    },

    setNewRecord: (state, action: PayloadAction<any>) => {
      state.record.new = action.payload;
    },
    setOldRecord: (state, action: PayloadAction<any>) => {
      state.record.old = action.payload;
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
