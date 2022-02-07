import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ILogEntry {
  success: boolean;
  sequence: number;
  items: number;
  chance: number;
  exploit?: boolean;
}

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
  exploitActive: boolean;
  exploits: number;
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
  log: ILogEntry[];
  exploitModalVisible: boolean;
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
    exploits: 2,
    exploitActive: false,
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
    stageAmount: 9,
    outcomeModal: {
      active: false,
      success: true,
    },
    log: [],
    exploitModalVisible: false,
  },
};

export const gameSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setCode: (state, action: PayloadAction<string | null>) => {
      state.actor.code = action.payload;
    },
    setExploitModal: (state, action: PayloadAction<boolean>) => {
      state.game.exploitModalVisible = action.payload;
    },
    setCodeAuthModal: (state, action: PayloadAction<boolean>) => {
      state.game.codeAuthModalVisible = action.payload;
    },
    setHacking: (state, action: PayloadAction<boolean>) => {
      state.game.hacking = action.payload;
    },
    setExploitActive: (state, action: PayloadAction<boolean>) => {
      state.actor.exploitActive = action.payload;
    },
    setExploits: (state, action: PayloadAction<number>) => {
      state.actor.exploits = action.payload;
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
    setLogs: (state, action: PayloadAction<ILogEntry | null>) => {
      const { payload } = action;
      if (payload && Object.keys(payload).length > 0) {
        state.game.log = [...state.game.log, payload];
      } else {
        state.game.log = [];
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
  setLogs,
  setExploitActive,
  setExploits,
  setExploitModal,
} = gameSlice.actions;

export const selectHacking = (state: RootState) => state.game.game.sequence;

export default gameSlice.reducer;
