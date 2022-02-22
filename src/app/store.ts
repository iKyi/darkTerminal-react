import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import gameReducer from "../features/game/gameSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    game: gameReducer,
    user: userReducer,
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
