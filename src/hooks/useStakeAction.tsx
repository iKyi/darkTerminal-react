import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
import {
  addLoader,
  removeLoader,
  startSnackbar,
} from "src/features/global/globalSlice";
import {
  setdatacBalance,
  setSolana,
  writeUserNftData,
} from "src/features/user/userSlice";
import axiosInstance from "src/lib/axios/axiosInstance";
import { REST_ENDPOINTS } from "src/lib/axios/endpoints";
import { DarkTerminalServiceProvider } from "src/providers/AuthDarkTerminalClassWrapper";
import { NFTNameTypes } from "src/utils/NFTutils";
import { useDebouncedCallback } from "use-debounce";

const useStakeAction = () => {
  const { darkTerminal } = useContext(DarkTerminalServiceProvider);
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { publicKey } = wallet;
  const navigate = useNavigate();

  const refreshNfts = useCallback(async () => {
    dispatch(addLoader("charsLoad"));
    dispatch(writeUserNftData([]));
    dispatch(setSolana(null));
    dispatch(setdatacBalance(null));
    if (publicKey && darkTerminal) {
      try {
        const [tokens, solana, dtac] = await Promise.all([
          darkTerminal.getNFTs(
            publicKey.toBase58(),
            process.env.REACT_APP_UPDATE_AUTHORITY || "",
            process.env.REACT_APP_NFT_SYMBOL || ""
          ),
          darkTerminal.getSolanaBalance(publicKey),
          darkTerminal.getTokenBalance(
            publicKey,
            new PublicKey(process.env.REACT_APP_DTAC_TOKEN_ADDRESS ?? "")
          ),
          axiosInstance.post(
            `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.LOGIN}${publicKey}`
          ),
        ]);
        dispatch(removeLoader("charsLoad"));
        dispatch(setSolana(solana));
        dispatch(setdatacBalance(dtac));
        dispatch(writeUserNftData(tokens));
      } catch (err) {
        dispatch(removeLoader("charsLoad"));
        throw new Error((err as any).toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkTerminal, publicKey]);

  const debouncedRefreshNfts = useDebouncedCallback(refreshNfts, 1000);

  const stakeAction = useCallback(
    async (mint: string, nameType: NFTNameTypes) => {
      if (darkTerminal) {
        dispatch(addLoader("stakeaction"));
        try {
          // transfer action
          const txId = await darkTerminal.transferNft(
            new PublicKey(mint),
            wallet,
            new PublicKey(
              process.env.REACT_APP_STAKING_ACCOUNT_PUBLIC_KEY || ""
            )
          );
          // posts the transaction to local backend
          await axiosInstance.post(
            `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.STAKE_NFT}${publicKey}`,
            {
              mintID: mint,
              txID: txId,
              nftType: nameType,
            }
          );
          dispatch(removeLoader("stakeaction"));
          dispatch(
            startSnackbar({
              variant: "success",
              content: `Transaction ${txId} successful !`,
            })
          );

          refreshNfts();
          navigate("/stake");
        } catch (err) {
          dispatch(removeLoader("stakeaction"));
          dispatch(
            startSnackbar({
              variant: "error",
              content: `Transaction failed ! ${err}`,
            })
          );
          throw new Error(err as string);
        }
      }

      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkTerminal, wallet, publicKey]
  );

  return { stakeAction, refreshNfts, debouncedRefreshNfts };
};
export default useStakeAction;
