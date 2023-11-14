import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT = {
  memberCode: "ME-00000000000000000",
  page: "0",
  bookCode: "테스트책",
  setting: false,
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
    setBookCode: (state, action: PayloadAction<string>) => {
      state.bookCode = action.payload;
    },
    setPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setSetting: (state, action: PayloadAction<boolean>) => {
      state.setting = action.payload;
    },
  },
});

export const firestoreActions = firestoreSlice.actions;
export default firestoreSlice.reducer;
