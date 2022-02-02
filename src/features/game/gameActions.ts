import { setTimeout } from "timers-browserify";
import { AppThunk } from "../../app/store";
import {
  setHacking,
  setOutcomeModal,
  setSequence,
  setTries,
} from "./gameSlice";

export const clickAction = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const { tries } = state.game.actor;
  const { sequence } = state.game.game;
  dispatch(setHacking(true));
  setTimeout(() => {
    if (Math.random() < 0.5) {
      dispatch(setSequence(sequence + 1));
      dispatch(setOutcomeModal({ active: true, success: true }));
    } else {
      dispatch(setTries(tries - 1));
      dispatch(setOutcomeModal({ active: true, success: false }));
    }
    dispatch(setHacking(false));
  }, 2000);
};
