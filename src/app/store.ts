import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import userReducer from "../features/user/userSlice";
import hackTheSystemReducer from "features/hackTheSystem/hackTheSystemSlice";
import binaryReducer from "features/binary/binarySlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    hackTheSystem: hackTheSystemReducer,
    binaryHack: binaryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
