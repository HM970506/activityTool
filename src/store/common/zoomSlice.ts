import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT = { zoom: 1, zoomView: 1, scale: 1 };
const zoomSlice = createSlice({
  name: "zoomReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setView: (state, action: PayloadAction<number>) => {
      state.zoomView = action.payload;
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
  },
});

export const zoomActions = zoomSlice.actions;
export default zoomSlice.reducer;
