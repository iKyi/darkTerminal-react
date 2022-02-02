import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    game: gameReducer,
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
