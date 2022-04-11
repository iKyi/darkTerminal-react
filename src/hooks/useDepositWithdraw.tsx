import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useContext } from "react";
import {
  addBlockingSnackbar,
  newSnackbar,
  removeBlockingSnackbar,
  setDepositModal,
  setInfoModal,
  setWithdrawModal,
} from "features/global/globalSlice";
import axiosInstance from "lib/axios/axiosInstance";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import getApiBase from "lib/axios/getApiBase";
import { useAppDispatch } from "app/hooks";
import { DarkTerminalServiceProvider } from "../providers/AuthDarkTerminalClassWrapper";
import useBinaryState from "./useBinaryState";
import useStakeAction from "./useStakeAction";
import { setTimeout } from "timers-browserify";

const useDepositWithdraw = () => {
  const dispatch = useAppDispatch();
  const { refreshBalance } = useStakeAction();
  const { refreshBalance: refreshDtBalance } = useBinaryState();
  const { darkTerminal } = useContext(DarkTerminalServiceProvider);
  const wallet = useWallet();
  const { connected } = wallet;

  const doDeposit = useCallback(
    async (amount: number) => {
      dispatch(setDepositModal(false));
      if (!darkTerminal?.connection || !connected) {
        dispatch(setInfoModal("Wallet not connected !"));
      } else {
        try {
          const transactionId = await darkTerminal.depositSol(wallet, amount);
          dispatch(
            addBlockingSnackbar({
              id: "transactionDeposit",
              text: "Processing transaction. Please wait and do not close this browser window. If the updated amount does not refresh immediately please allow up to 5 minutes for balance changes.",
              state: "loading",
            })
          );
          await axiosInstance.post(
            `${getApiBase()}${REST_ENDPOINTS.DEPOSIT_SOL}${wallet.publicKey}`,
            {
              TxId: transactionId,
            }
          );
          dispatch(
            newSnackbar({
              content: "TRANSACTION SUCCESS",
              variant: "success",
              id: `depositError${Math.random()}}`,
            })
          );
          refreshBalance();
          refreshDtBalance();
          dispatch(removeBlockingSnackbar("transactionDeposit"));
        } catch (err) {
          dispatch(removeBlockingSnackbar("transactionDeposit"));
          dispatch(
            newSnackbar({
              content: (err as any).toString(),
              variant: "error",
              id: `depositError${Math.random()}}`,
            })
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkTerminal, wallet]
  );

  const doWithdraw = useCallback(
    async (amount: number) => {
      dispatch(setWithdrawModal(false));
      try {
        dispatch(
          addBlockingSnackbar({
            id: "transactionWithdraw",
            text: "Processing transaction. Please wait and do not close this browser window. If the updated amount does not refresh immediately please allow up to 5 minutes for balance changes.",
            state: "loading",
          })
        );
        await axiosInstance.post(
          `${getApiBase()}${REST_ENDPOINTS.WITHDRAW_SOL}${wallet.publicKey}`,
          {
            amount: amount,
          }
        );
        dispatch(
          newSnackbar({
            content: "TRANSACTION SUCCESS",
            variant: "success",
            id: `depositError${Math.random()}}`,
          })
        );
        setTimeout(() => {
          dispatch(removeBlockingSnackbar("transactionWithdraw"));
          refreshBalance();
          refreshDtBalance();
        }, 1000);
      } catch (err: any) {
        dispatch(removeBlockingSnackbar("transactionWithdraw"));
        const { message } = err;
        const obj = message ?? err;
        dispatch(
          newSnackbar({
            content: (obj as any).toString(),
            variant: "error",
            id: `depositError${Math.random()}}`,
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallet, darkTerminal]
  );

  return { doDeposit, doWithdraw };
};
export default useDepositWithdraw;
