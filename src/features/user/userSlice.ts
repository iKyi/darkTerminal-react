import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";

export interface UserState {
  tokens: ITokenCustomEntry[];
  solanaBalance: number | null;
  datacBalance: number | null;
}

const initialState: UserState = {
  tokens: [],
  solanaBalance: null,
  datacBalance: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setTokens: (state, action: PayloadAction<any[]>) => {
      state.tokens = action.payload;
    },
    setSolana: (state, action: PayloadAction<number | null>) => {
      state.solanaBalance = action.payload;
    },
    setdatacBalance: (state, action: PayloadAction<number | null>) => {
      state.datacBalance = action.payload;
    },
  },
});

export const { setTokens, setSolana, setdatacBalance } = userSlice.actions;

export default userSlice.reducer;
