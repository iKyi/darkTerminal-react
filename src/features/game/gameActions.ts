import { setTimeout } from "timers-browserify";
import { AppThunk } from "../../app/store";
import {
  ILogEntry,
  setActiveNodes,
  setExploitActive,
  setExploitModal,
  setExploits,
  setHacking,
  setLogs,
  setOutcomeModal,
  setSequence,
  setTries,
} from "./gameSlice";

export const clickAction =
  (element: any): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const { tries, exploitActive } = state.game.actor;
    const { sequence } = state.game.game;
    dispatch(setHacking(true));
    const { id, chance } = element;

    let workingChance = chance;
    if (exploitActive) {
      workingChance = chance * 2;
    }

    let itemCount = 0;
    switch (true) {
      case id.includes("1") || id.includes("2") || id.includes("3"):
        itemCount = 3;
        break;
      case id.includes("4") || id.includes("5"):
        itemCount = 5;
        break;
      case id.includes("6"):
        itemCount = 7;
        break;
      default:
        break;
    }

    const logEntry: ILogEntry = {
      chance: workingChance * 100,
      items: itemCount,
      sequence: sequence,
      success: true,
      exploit: exploitActive,
    };

    const nextSequence = sequence + 1;

    setTimeout(() => {
      // if (true) {
      // if (Math.random() < workingChance) {
      if (Math.random() < 0.8) {
        dispatch(setSequence(nextSequence));
        dispatch(setOutcomeModal({ active: true, success: true }));
        dispatch(setActiveNodes(id));
        logEntry.success = true;
      } else {
        dispatch(setTries(tries - 1));
        dispatch(setOutcomeModal({ active: true, success: false }));
        logEntry.success = false;
      }
      dispatch(setLogs(logEntry));
      dispatch(setHacking(false));
      if (exploitActive) {
        dispatch(setExploitActive(false));
      }
    }, 2000);
  };

export const stageSevenSubmit =
  (code: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setHacking(true));
    const state = getState();
    const { sequence } = state.game.game;
    const { tries, exploitActive } = state.game.actor;

    const validCode = "4234";
    const nextSequence = sequence + 1;

    const logEntry: ILogEntry = {
      chance: 10,
      items: 10,
      sequence: sequence,
      success: true,
      exploit: exploitActive,
    };

    if (exploitActive) {
      logEntry.chance = logEntry.chance * 2;
    }

    setTimeout(() => {
      if (code === validCode) {
        dispatch(setSequence(nextSequence));
        logEntry.success = true;
        dispatch(setOutcomeModal({ active: true, success: true }));
      } else {
        dispatch(setTries(tries - 1));
        logEntry.success = false;
        dispatch(setOutcomeModal({ active: true, success: false }));
      }
      dispatch(setLogs(logEntry));
      dispatch(setHacking(false));
      if (exploitActive) {
        dispatch(setExploitActive(false));
      }
    }, 2000);
  };

export const triggerExploit = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const { exploits, exploitActive } = state.game.actor;

  dispatch(setExploitModal(true));
  if (exploits > 0 && !exploitActive) {
    setTimeout(() => {
      dispatch(setExploitActive(true));
      dispatch(setExploits(exploits - 1));
      dispatch(setExploitModal(false));
    }, 2000);
  }
};
