import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { setTimeout } from "timers-browserify";
import { AppThunk } from "../../app/store";

export type SnackbarVariants = "error" | "success" | "info";
export interface GlobalState {
  showComingSoon: boolean;
  candyMachineReloading: boolean;
  publicSiteData: Record<any, any> | null;
  snackBar: null | {
    content: string;
    variant: SnackbarVariants;
  };
  snackbarVisible: boolean;
  infoModal: string | null | ReactNode;
  loaders: string[];
}

const initialState: GlobalState = {
  candyMachineReloading: false,
  showComingSoon: false,
  publicSiteData: null,
  snackBar: null,
  snackbarVisible: false,
  infoModal: null,
  loaders: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    addLoader: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.loaders = [...state.loaders, payload];
    },
    removeLoader: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.loaders = state.loaders.filter((item) => item !== payload);
    },
    setInfoModal: (state, action: PayloadAction<string | null | ReactNode>) => {
      state.infoModal = action.payload;
    },
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
    setCandyMachineLoading: (state, action: PayloadAction<boolean>) => {
      state.candyMachineReloading = action.payload;
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
  setCandyMachineLoading,
  setInfoModal,
  addLoader,
  removeLoader,
} = globalSlice.actions;

export default globalSlice.reducer;
