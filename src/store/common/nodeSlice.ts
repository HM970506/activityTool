import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { canvasType } from "../../components/newactivitytool/types";

const DEFAULT = {
  canvas: null,
  loading: false,
  background: null,
  textareaContainer: null,
  dialogContainer: null,
  record: "",
  opacity: 0,
  history: { undo: 0, redo: 0 },
};
const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    setUndo: (state, action: PayloadAction<number>) => {
      state.history.undo = action.payload;
    },
    setRedo: (state, action: PayloadAction<number>) => {
      state.history.redo = action.payload;
    },
    setCanvas: (state, action: PayloadAction<canvasType>) => {
      state.canvas = action.payload;
    },
    setTextareaContainer: (state, action: PayloadAction<any>) => {
      state.textareaContainer = action.payload;
    },
    setDialogContainer: (state, action: PayloadAction<any>) => {
      state.dialogContainer = action.payload;
    },
    setBackground: (state, action: PayloadAction<any>) => {
      state.background = action.payload;
    },

    setOpacity: (state, action: PayloadAction<number>) => {
      state.opacity = action.payload;
    },

    setRecord: (state, action: PayloadAction<any>) => {
      state.record = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
