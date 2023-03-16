import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectSlice = createSlice({
  name: "categoryReducer",
  initialState: { select: null },

  reducers: {
    selectChange: (state, action: PayloadAction<any>) => {
      state.select = action.payload;
      console.log("선택노드:", action.payload);
    },
  },
});

export const selectActions = selectSlice.actions;
export default selectSlice.reducer;
