import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "zoomReducer",
  initialState: { zoom: 1, zoomView: 1, scale: 1 },

  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.zoom = action.payload;
    },
    reset: (state) => {
      state.zoom = state.scale;
      state.zoomView = 1;
    },
    setView: (state, action: PayloadAction<any>) => {
      state.zoomView = action.payload;
    },
    setScale: (state, action: PayloadAction<any>) => {
      state.scale = action.payload;
    },
  },
});

export const zoomActions = zoomSlice.actions;
export default zoomSlice.reducer;
