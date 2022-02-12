import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setTimeout } from "timers-browserify";
import { AppThunk } from "../../app/store";

export type SnackbarVariants = "error" | "success" | "info";
export interface GlobalState {
  showComingSoon: boolean;
  publicSiteData: Record<any, any> | null;
  snackBar: null | {
    content: string;
    variant: SnackbarVariants;
  };
  snackbarVisible: boolean;
}

const initialState: GlobalState = {
  showComingSoon: false,
  publicSiteData: null,
  snackBar: null,
  snackbarVisible: false,
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
    startSnackbar: (
      state,
      action: PayloadAction<{ content: string; variant: SnackbarVariants }>
    ) => {
      state.snackBar = action.payload;
      state.snackbarVisible = true;
    },
    closeSnackbar: (state) => {
      state.snackbarVisible = false;
    },
    cleanSnackbarObj: (state) => {
      state.snackBar = null;
    },
  },
});

export const delayedSnackbarClose = (): AppThunk => (dispatch) => {
  dispatch(closeSnackbar());
  setTimeout(() => {
    dispatch(cleanSnackbarObj());
  }, 350);
};

export const {
  setComingSoon,
  setPublicSiteData,
  startSnackbar,
  closeSnackbar,
  cleanSnackbarObj,
} = globalSlice.actions;

export default globalSlice.reducer;
