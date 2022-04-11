import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GENERAL_SETTINGS } from "constants/generalSettings";
import { ReactNode } from "react";
import { setTimeout } from "timers-browserify";
import { AppThunk } from "app/store";

export type SnackbarVariants = "error" | "success" | "info";
export type BlockingTransactionsStates = "loading";

export interface IBlockingSnackbar {
  state: BlockingTransactionsStates;
  text: string;
  id: string;
}
export interface ISmallSnackbar {
  content: string;
  variant: SnackbarVariants;
  id: string;
}

export interface GlobalState {
  showComingSoon: boolean;
  candyMachineReloading: boolean;
  publicSiteData: Record<any, any> | null;
  snackBars: ISmallSnackbar[];
  snackbarVisible: boolean;
  infoModal: string | null | ReactNode;
  loaders: string[];
  blockingSnackbars: IBlockingSnackbar[];
  depositModal: boolean;
  withdrawModal: boolean;
}

const initialState: GlobalState = {
  candyMachineReloading: false,
  showComingSoon: false,
  publicSiteData: null,
  snackBars: [],
  snackbarVisible: false,
  infoModal: null,
  loaders: [],
  blockingSnackbars: [],
  depositModal: false,
  withdrawModal: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setDepositModal: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.depositModal = payload;
    },
    setWithdrawModal: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.withdrawModal = payload;
    },
    addBlockingSnackbar: (state, action: PayloadAction<IBlockingSnackbar>) => {
      const { payload } = action;
      state.blockingSnackbars = [...state.blockingSnackbars, payload];
    },
    removeBlockingSnackbar: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.blockingSnackbars = state.blockingSnackbars.filter(
        (item) => item.id !== payload
      );
    },
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
    startSnackbar: (state, action: PayloadAction<ISmallSnackbar>) => {
      state.snackBars = [action.payload, ...state.snackBars];
      state.snackbarVisible = true;
    },
    closeSnackbar: (state, action: PayloadAction<string>) => {
      state.snackBars = state.snackBars.filter(
        (item) => item.id !== action.payload
      );
    },
    closeAllSnackbars: (state) => {
      state.snackBars = [];
    },
    setCandyMachineLoading: (state, action: PayloadAction<boolean>) => {
      state.candyMachineReloading = action.payload;
    },
  },
});

export const newSnackbar =
  (item: ISmallSnackbar): AppThunk =>
  (dispatch) => {
    dispatch(startSnackbar(item));
    setTimeout(() => {
      dispatch(closeSnackbar(item.id));
    }, GENERAL_SETTINGS.SNACKBAR_TIMEOUT);
  };
export const {
  setComingSoon,
  setPublicSiteData,
  startSnackbar,
  closeSnackbar,
  setCandyMachineLoading,
  setInfoModal,
  addLoader,
  removeLoader,
  addBlockingSnackbar,
  removeBlockingSnackbar,
  closeAllSnackbars,
  setDepositModal,
  setWithdrawModal,
} = globalSlice.actions;

export default globalSlice.reducer;
