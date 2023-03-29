import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: {
    canvas: null,
    nowTextbox: null,
    textarea: null,
    opacity: 0,
    zoom: 1,
  },

  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload;
      //console.log(JSON.stringify(action.payload));
    },
    setTextarea: (state, action: PayloadAction<any>) => {
      state.textarea = action.payload;
      //console.log(JSON.stringify(action.payload));
    },

    setOpacity: (state, action: PayloadAction<any>) => {
      state.opacity = action.payload;
      //console.log(JSON.stringify(action.payload));
    },
    setZoom: (state, action: PayloadAction<any>) => {
      state.opacity = action.payload;
      //console.log(JSON.stringify(action.payload));
    },
    setTextbox: (state, action: PayloadAction<any>) => {
      state.nowTextbox = action.payload;
      //console.log(JSON.stringify(action.payload));
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
