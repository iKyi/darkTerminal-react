import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  showComingSoon: boolean;
}

const initialState: GlobalState = {
  showComingSoon: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setComingSoon: (state, action: PayloadAction<boolean>) => {
      state.showComingSoon = action.payload;
    },
  },
});

export const { setComingSoon } = globalSlice.actions;

export default globalSlice.reducer;
