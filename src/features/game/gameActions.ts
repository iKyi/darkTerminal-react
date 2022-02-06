import { setTimeout } from "timers-browserify";
import { AppThunk } from "../../app/store";
import {
  setActiveNodes,
  setHacking,
  setOutcomeModal,
  setSequence,
  setTries,
} from "./gameSlice";

export const clickAction =
  (element: any): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const { tries } = state.game.actor;
    const { sequence } = state.game.game;
    dispatch(setHacking(true));
    console.log(element);
    const { id } = element;

    setTimeout(() => {
      // if (Math.random() < 0.5) {
      if (true) {
        dispatch(setSequence(sequence + 1));
        dispatch(setOutcomeModal({ active: true, success: true }));
        dispatch(setActiveNodes(id));
      } else {
        dispatch(setTries(tries - 1));
        dispatch(setActiveNodes(id));
        dispatch(setSequence(1));
        dispatch(setOutcomeModal({ active: true, success: false }));
      }
      dispatch(setHacking(false));
    }, 2000);
  };
