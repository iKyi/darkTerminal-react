import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IStatus {
  playersCount: {
    main: number;
    secondary: number;
    tertiary: number;
  };
}

interface IActorData {
  tries: number;
  sol: number;
  dtac: number;
}

interface IPlayData {
  sequence: number;
  graphData: Record<any, any> | null;
  hacking: boolean;
  stageAmount: number;
  outcomeModal: {
    active: boolean;
    success: boolean;
  };
}

export interface GlobalState {
  status: IStatus;
  actor: IActorData;
  game: IPlayData;
}

const initialState: GlobalState = {
  actor: {
    dtac: 1000,
    sol: 10,
    tries: 3,
  },
  status: {
    playersCount: {
      main: 7,
      secondary: 72,
      tertiary: 400,
    },
  },
  game: {
    graphData: null,
    hacking: false,
    sequence: 3,
    stageAmount: 8,
    outcomeModal: {
      active: false,
      success: true,
    },
  },
};

export const gameSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setHacking: (state, action: PayloadAction<boolean>) => {
      state.game.hacking = action.payload;
    },
    setTries: (state, action: PayloadAction<number>) => {
      state.actor.tries = action.payload;
    },
    setSequence: (state, action: PayloadAction<number>) => {
      state.game.sequence = action.payload;
    },
    setGraphData: (state, action: PayloadAction<Record<any, any> | null>) => {
      state.game.graphData = action.payload;
    },
    setOutcomeModal: (
      state,
      action: PayloadAction<{ active: boolean; success: boolean }>
    ) => {
      state.game.outcomeModal = action.payload;
    },
  },
});

export const {
  setGraphData,
  setTries,
  setSequence,
  setHacking,
  setOutcomeModal,
} = gameSlice.actions;

export const selectHacking = (state: RootState) => state.game.game.sequence;

export default gameSlice.reducer;
