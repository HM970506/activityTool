import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "zoomReducer",
  initialState: { zoom: 1, zoomChange: false },

  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.zoom = action.payload;
    },
    reset: (state) => {
      state.zoom = 1;
    },
  },
});

export const zoomActions = zoomSlice.actions;
export default zoomSlice.reducer;
