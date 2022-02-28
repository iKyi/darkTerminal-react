import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "src/app/store";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";

export interface UserState {
  tokens: ITokenCustomEntry[];
  solanaBalance: number | null;
  datacBalance: number | null;
  redeemableDtac: number | null;
  redeemableSol: number | null;
  charsLoading: boolean;
}

const initialState: UserState = {
  tokens: [],
  solanaBalance: null,
  datacBalance: null,
  redeemableDtac: null,
  redeemableSol: null,
  charsLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setCharLoading: (state, action: PayloadAction<boolean>) => {
      state.charsLoading = action.payload;
    },
    setTokens: (state, action: PayloadAction<ITokenCustomEntry[]>) => {
      state.tokens = action.payload;
    },
    setSolana: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? payload : null;
      state.solanaBalance = value;
    },
    setdatacBalance: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? payload : null;
      state.datacBalance = value;
    },
    setRedeemableSol: (state, action: PayloadAction<number | null>) => {
      state.redeemableSol = action.payload;
    },
    setRedeemableDtac: (state, action: PayloadAction<number | null>) => {
      state.redeemableDtac = action.payload;
    },
  },
});

export const writeUserNftData =
  (nfts: ITokenCustomEntry[]): AppThunk =>
  (dispatch) => {
    if (nfts.length === 0) {
      dispatch(setTokens([]));
    } else {
      dispatch(setTokens(nfts));
    }
  };

export const {
  setTokens,
  setSolana,
  setdatacBalance,
  setRedeemableSol,
  setRedeemableDtac,
  setCharLoading,
} = userSlice.actions;

export default userSlice.reducer;
