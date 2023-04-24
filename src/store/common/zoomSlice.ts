import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "zoomReducer",
  initialState: { zoom: 1, zoomView: 1, scale: 1 },

  reducers: {
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    reset: (state) => {
      state.zoom = state.scale;
      state.zoomView = 1;
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
