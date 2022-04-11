import { AppThunk } from "app/store";
import {
  IRecentPlayEntry,
  setBinaryLoading,
  setBinaryState,
  setSuccessAmount,
  addPlayerRecentPlay,
} from "./binarySlice";
import { setTimeout } from "timers-browserify";
import axiosInstance from "lib/axios/axiosInstance";
import getApiBase from "lib/axios/getApiBase";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import { PublicKey } from "@solana/web3.js";

export const binaryPlay =
  (walletKey: PublicKey): AppThunk =>
  (dispatch, getState) => {
    dispatch(setBinaryLoading(true));
    const activeStake = getState().binaryHack.activeStake;
    let stakeHash: string;

    switch (activeStake) {
      case 0.05:
        stakeHash = "`AVzK2g.x`5>Wd%-";
        break;
      case 0.1:
        stakeHash = "u1{sIW.jyMC8xZs<";
        break;
      case 0.25:
        stakeHash = "2U()V?[Ic;W2%^i5";
        break;
      case 0.5:
        stakeHash = "+%,:/u=Y$lQg97(J";
        break;
      case 1:
        stakeHash = "htZY!bD&2MPoY~}%";
        break;
      case 2:
        stakeHash = "s4Ihi|VbmDTy<=+r";
        break;
      default:
        break;
    }

    setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post(
          `${getApiBase()}${REST_ENDPOINTS.BINARY_PLAY}${walletKey}`,
          {
            key: stakeHash,
          }
        );
        const { win, result, text, timestamp, totalAmount } = data;
        const newEntry: IRecentPlayEntry = {
          result,
          text,
          timestamp,
          win,
        };
        dispatch(addPlayerRecentPlay(newEntry));
        if (win) {
          dispatch(setBinaryState("success"));
          dispatch(setSuccessAmount(totalAmount));
        } else {
          dispatch(setBinaryState("error"));
        }
        dispatch(setBinaryLoading(false));
      } catch (_) {
        // if error from API return context to neutral
        dispatch(setBinaryLoading(false));
        dispatch(setBinaryState("idle"));
      }
    }, 1000);
  };
