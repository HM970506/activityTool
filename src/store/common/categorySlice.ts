import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT = {
  category: "",
  view: true,
  option: false,
  subcategory: {
    template: { index: -1, state: false },
    stamp: { index: 0, state: false, color: "black" },
    tape: { index: 0, state: false, color: "black" },
  },
};

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    optionChange: (state, action: PayloadAction<boolean>) => {
      state.option = action.payload;
    },
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
    stampColorChange: (state, action: PayloadAction<string>) => {
      state.subcategory.stamp.color = action.payload;
    },
    tapeColorChange: (state, action: PayloadAction<string>) => {
      state.subcategory.tape.color = action.payload;
    },
    templateOn: (state) => {
      state.subcategory.template.state = true;
      state.subcategory.stamp.state = false;
      state.subcategory.tape.state = false;
    },
    templateOff: (state) => {
      state.subcategory.template.state = false;
    },

    stampOn: (state) => {
      state.subcategory.stamp.state = true;
      state.subcategory.template.state = false;
      state.subcategory.tape.state = false;
    },
    stampOff: (state) => {
      state.subcategory.stamp.state = false;
    },

    tapeOn: (state) => {
      state.subcategory.tape.state = true;
      state.subcategory.template.state = false;
      state.subcategory.stamp.state = false;
    },
    tapeOff: (state) => {
      state.subcategory.tape.state = false;
    },

    setView: (state, action: PayloadAction<boolean>) => {
      state.view = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
