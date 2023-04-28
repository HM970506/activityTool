import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: {
    category: "DRAWTOOLS",
    view: true,
    subcategory: {
      template: { index: -1, state: true },
      stamp: { index: 0, state: false },
      tape: { index: 0, state: false },
    },
  },

  reducers: {
    categoryChange: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    templateChange: (state, action: PayloadAction<number>) => {
      state.subcategory.template.index = action.payload;
    },
    stampChange: (state, action: PayloadAction<number>) => {
      state.subcategory.stamp.index = action.payload;
    },
    tapeChange: (state, action: PayloadAction<number>) => {
      state.subcategory.tape.index = action.payload;
    },
    templateOn: (state) => {
      state.subcategory.template.state = true;
      state.subcategory.stamp.state = false;
      state.subcategory.tape.state = false;
    },

    stampOn: (state) => {
      state.subcategory.stamp.state = true;
      state.subcategory.template.state = false;
      state.subcategory.tape.state = false;
    },

    tapeOn: (state) => {
      state.subcategory.tape.state = true;
      state.subcategory.template.state = false;
      state.subcategory.stamp.state = false;
    },

    setView: (state, action: PayloadAction<boolean>) => {
      state.view = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
