import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectSlice = createSlice({
  name: "categoryReducer",
  initialState: { select: null },

  reducers: {
    selectChange: (state, action: PayloadAction<any>) => {
      state.select = action.payload;
      console.log("지금 선택: ", state.select);
    },
  },
});

export const selectActions = selectSlice.actions;
export default selectSlice.reducer;
