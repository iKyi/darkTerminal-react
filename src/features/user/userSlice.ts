import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";

export interface UserState {
  tokens: ITokenCustomEntry[];
}

const initialState: UserState = {
  tokens: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setTokens: (state, action: PayloadAction<any[]>) => {
      state.tokens = action.payload;
    },
  },
});

export const { setTokens } = userSlice.actions;

export default userSlice.reducer;
