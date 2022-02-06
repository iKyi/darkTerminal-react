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
  code: string | null;
}

interface IPlayData {
  codeAuthModalVisible: boolean;
  sequence: number;
  activeNodes: string[];
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
    code: null,
  },
  status: {
    playersCount: {
      main: 7,
      secondary: 72,
      tertiary: 400,
    },
  },
  game: {
    codeAuthModalVisible: false,
    graphData: null,
    hacking: false,
    activeNodes: [],
    sequence: 1,
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
    setCode: (state, action: PayloadAction<string | null>) => {
      state.actor.code = action.payload;
    },
    setCodeAuthModal: (state, action: PayloadAction<boolean>) => {
      state.game.codeAuthModalVisible = action.payload;
    },
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
    setActiveNodes: (state, action: PayloadAction<string | null>) => {
      const { payload } = action;
      if (payload && payload.length > 0) {
        state.game.activeNodes = [...state.game.activeNodes, payload];
      } else {
        state.game.activeNodes = [];
      }
    },
  },
});

export const {
  setGraphData,
  setTries,
  setSequence,
  setHacking,
  setOutcomeModal,
  setActiveNodes,
  setCode,
  setCodeAuthModal,
} = gameSlice.actions;

export const selectHacking = (state: RootState) => state.game.game.sequence;

export default gameSlice.reducer;
