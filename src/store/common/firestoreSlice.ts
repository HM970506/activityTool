import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT = {
  memberCode: "default",
};

const firestoreSlice = createSlice({
  name: "firestoreReducer",
  initialState: DEFAULT,

  reducers: {
    reset: (state) => {
      state = DEFAULT;
    },
    setMemberCode: (state, action: PayloadAction<string>) => {
      state.memberCode = action.payload;
    },
  },
});

export const firestoreActions = firestoreSlice.actions;
export default firestoreSlice.reducer;
