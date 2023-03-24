import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "historyReducer",
  initialState: { history: new Array(), nowIndex: null },

  reducers: {
    push: (state, action: PayloadAction<any>) => {
      state.history.push(action.payload);
    },
    setIndex: (state, action: PayloadAction<any>) => {
      state.nowIndex = action.payload;
    },
    render: (state, action: PayloadAction<any>) => {
      if (state.nowIndex)
        state.history = state.history.slice(0, state.nowIndex);
    },
  },
});

export const historyActions = historySlice.actions;
export default historySlice.reducer;
