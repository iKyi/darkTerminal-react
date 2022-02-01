import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  showComingSoon: boolean;
  publicSiteData: Record<any, any> | null;
}

const initialState: GlobalState = {
  showComingSoon: false,
  publicSiteData: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setComingSoon: (state, action: PayloadAction<boolean>) => {
      state.showComingSoon = action.payload;
    },
    setPublicSiteData: (
      state,
      action: PayloadAction<Record<any, any> | null>
    ) => {
      state.publicSiteData = action.payload;
    },
  },
});

export const { setComingSoon, setPublicSiteData } = globalSlice.actions;

export default globalSlice.reducer;
