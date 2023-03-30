import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: {
    category: "DRAWTOOLS",
    subcategory: {
      template: { index: -1, state: false },
      stamp: { index: 0, state: false },
      tape: { index: 0, state: false },
    },
  },

  reducers: {
    categoryChange: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
    templateChange: (state, action: PayloadAction<any>) => {
      state.subcategory.template.index = action.payload;
    },
    stampChange: (state, action: PayloadAction<any>) => {
      state.subcategory.stamp.index = action.payload;
    },
    tapeChange: (state, action: PayloadAction<any>) => {
      state.subcategory.tape.index = action.payload;
    },

    stampOn: (state) => {
      state.subcategory.stamp.state = true;
    },
    stampOff: (state) => {
      state.subcategory.stamp.state = false;
    },
    tapeOn: (state) => {
      state.subcategory.tape.state = true;
    },
    tapeoff: (state) => {
      state.subcategory.tape.state = false;
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
