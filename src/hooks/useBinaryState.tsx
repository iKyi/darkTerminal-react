import { useWallet } from "@solana/wallet-adapter-react";
import { useAppDispatch } from "app/hooks";
import { LOADING_KEY } from "constants/loadingKeys";
import {
  addBlockingSnackbar,
  removeBlockingSnackbar,
} from "features/global/globalSlice";
import axiosGetter from "lib/axios/axiosGetter";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import getApiBase from "lib/axios/getApiBase";

const useBinaryState = () => {
  const dispatch = useAppDispatch();
  const { publicKey } = useWallet();

  const refreshBalance = async () => {
    if (publicKey) {
      dispatch(
        addBlockingSnackbar({
          state: "loading",
          id: LOADING_KEY.BINARY_BALANCE_LOADING,
          text: "Refreshing balance ...",
        })
      );
      await axiosGetter(
        `${getApiBase()}${REST_ENDPOINTS.BINARY_GAME_STATE}${publicKey}`
      );
      dispatch(removeBlockingSnackbar(LOADING_KEY.BINARY_BALANCE_LOADING));
    }
  };
  return { refreshBalance };
};
export default useBinaryState;
