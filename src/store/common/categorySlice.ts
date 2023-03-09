import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState: { category: "TOOLS" },

  reducers: {
    categoryChange: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
