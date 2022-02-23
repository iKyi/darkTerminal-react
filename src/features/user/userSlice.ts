import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "src/app/store";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";

export interface UserState {
  tokens: ITokenCustomEntry[];
  solanaBalance: number | null;
  datacBalance: number | null;
  redeemableDtac: number | null;
  redeemableSol: number | null;
}

const initialState: UserState = {
  tokens: [],
  solanaBalance: null,
  datacBalance: null,
  redeemableDtac: null,
  redeemableSol: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setTokens: (state, action: PayloadAction<ITokenCustomEntry[]>) => {
      state.tokens = action.payload;
    },
    setSolana: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? Number(payload.toFixed(4)) : null;
      state.solanaBalance = value;
    },
    setdatacBalance: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? Number(payload.toFixed(4)) : null;
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
      dispatch(setRedeemableSol(null));
      dispatch(setRedeemableDtac(null));
    } else {
      dispatch(setTokens(nfts));
      const redeemableSol = nfts.reduce(
        (previousValue, iterationNft) =>
          previousValue +
          (iterationNft.solRedeemValue ? iterationNft.solRedeemValue : 0),
        0
      );
      const redeemableDtac = nfts.reduce(
        (previousValue, iterationNft) =>
          previousValue +
          (iterationNft.dtacRedeemValue ? iterationNft.dtacRedeemValue : 0),
        0
      );
      dispatch(setRedeemableSol(Number(redeemableSol.toFixed(4))));
      dispatch(setRedeemableDtac(Number(redeemableDtac.toFixed(4))));
    }
  };

export const {
  setTokens,
  setSolana,
  setdatacBalance,
  setRedeemableSol,
  setRedeemableDtac,
} = userSlice.actions;

export default userSlice.reducer;