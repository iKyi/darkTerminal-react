import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRecentPlayEntry {
  text: string;
  result: string;
  timestamp: string;
  win: boolean;
}
export type ActiveItemType = 0 | 1 | null;
export type ApplicationState = "success" | "error" | "idle" | "disabled";

export interface BinaryHackState {
  recentPlays: IRecentPlayEntry[];
  hackingInProgress: boolean;
  state: ApplicationState;
  activeItem: ActiveItemType;
  activeStake: number | null;
  successAmount: string | null;
  playerRecentPlays: IRecentPlayEntry[];
}

const initialState: BinaryHackState = {
  hackingInProgress: false,
  recentPlays: [],
  state: "idle",
  activeItem: null,
  activeStake: null,
  successAmount: null,
  playerRecentPlays: [],
};

export const binaryHackSlice = createSlice({
  name: "binaryHack",
  initialState,

  reducers: {
    setRecentPlays: (state, action: PayloadAction<IRecentPlayEntry[]>) => {
      state.recentPlays = action.payload;
    },
    setActiveStakeBinary: (state, action: PayloadAction<number | null>) => {
      state.activeStake = action.payload;
    },
    setActiveItem: (state, action: PayloadAction<ActiveItemType>) => {
      state.activeItem = action.payload;
    },
    setBinaryState: (state, action: PayloadAction<ApplicationState>) => {
      state.state = action.payload;
    },
    setBinaryLoading: (state, action: PayloadAction<boolean>) => {
      state.hackingInProgress = action.payload;
    },
    setSuccessAmount: (state, action: PayloadAction<string | null>) => {
      state.successAmount = action.payload;
    },
    addPlayerRecentPlay: (
      state,
      { payload }: PayloadAction<IRecentPlayEntry>
    ) => {
      let workingPlays = state.playerRecentPlays;
      workingPlays = [payload, ...workingPlays];
      state.playerRecentPlays = workingPlays;
    },
    setPlayerRecentPlays: (
      state,
      { payload }: PayloadAction<IRecentPlayEntry[]>
    ) => {
      state.playerRecentPlays = payload;
    },
  },
});

export const {
  setRecentPlays,
  setActiveItem,
  setBinaryState,
  setActiveStakeBinary,
  setBinaryLoading,
  setSuccessAmount,
  setPlayerRecentPlays,
  addPlayerRecentPlay,
} = binaryHackSlice.actions;

export default binaryHackSlice.reducer;
