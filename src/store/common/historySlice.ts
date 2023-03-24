import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "historyReducer",
  initialState: { history: new Array(), nowIndex: -1 },

  reducers: {
    push: (state, action: PayloadAction<any>) => {
      state.history.push(action.payload);
      state.nowIndex = state.nowIndex != -1 ? state.nowIndex + 1 : 0;
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
