import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
import { LOADING_KEY } from "src/constants/loadingKeys";
import {
  addBlockingSnackbar,
  addLoader,
  removeBlockingSnackbar,
  removeLoader,
  startSnackbar,
} from "src/features/global/globalSlice";
import {
  setdatacBalance,
  setRedeemableDtac,
  setRedeemableSol,
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
    dispatch(writeUserNftData([]));
    dispatch(setSolana(null));
    dispatch(setdatacBalance(null));
    if (publicKey && darkTerminal) {
      try {
        dispatch(addLoader(LOADING_KEY.CHARS_LOADING));
        const [nftsGetterResponse, solana, dtac] = await Promise.all([
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
        const { nfts, totalClaimableDTAC, totalClaimableSOL } =
          nftsGetterResponse;
        dispatch(setRedeemableSol(totalClaimableSOL));
        dispatch(setRedeemableDtac(totalClaimableDTAC));
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        dispatch(setSolana(solana));
        dispatch(setdatacBalance(dtac));
        dispatch(writeUserNftData(nfts));
      } catch (err) {
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        throw new Error((err as any).toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkTerminal, publicKey]);

  const debouncedRefreshNfts = useDebouncedCallback(refreshNfts, 1000);

  const stakeAction = useCallback(
    async (mint: string, nameType: NFTNameTypes) => {
      if (darkTerminal) {
        dispatch(addLoader(LOADING_KEY.STAKING));
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
          dispatch(
            addBlockingSnackbar({
              id: "transactionConfirming",
              state: "loading",
              text: "Processing transaction, please do not close this window ...",
            })
          );
          await axiosInstance.post(
            `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.STAKE_NFT}${publicKey}`,
            {
              mintID: mint,
              txID: txId,
              nftType: nameType,
            }
          );
          dispatch(removeBlockingSnackbar("transactionConfirming"));
          dispatch(removeLoader(LOADING_KEY.STAKING));
          dispatch(
            startSnackbar({
              variant: "success",
              content: `Transaction successful !`,
            })
          );

          refreshNfts();
          navigate("/stake");
        } catch (err) {
          dispatch(removeLoader(LOADING_KEY.STAKING));
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

  const claimDTAC = useCallback(
    async (mintId: string) => {
      try {
        dispatch(
          addBlockingSnackbar({
            id: "DTACClaimtransaction",
            state: "loading",
            text: "Processing transaction, please do not close this window ...",
          })
        );
        await axiosInstance.put(
          `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.CLAIM_DTAC}/${publicKey}`,
          {
            mintID: mintId,
          }
        );
        dispatch(removeBlockingSnackbar("DTACClaimtransaction"));
        refreshNfts();
      } catch (err) {
        startSnackbar({
          variant: "error",
          content: `Transaction failed ! ${err}`,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publicKey]
  );

  const claimSOL = useCallback(
    async (mintId: string) => {
      try {
        dispatch(
          addBlockingSnackbar({
            id: "SOLClaimtransaction",
            state: "loading",
            text: "Processing transaction, please do not close this window ...",
          })
        );
        await axiosInstance.put(
          `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.CLAIM_SOL}/${publicKey}`,
          {
            mintID: mintId,
          }
        );
        dispatch(removeBlockingSnackbar("SOLClaimtransaction"));
        refreshNfts();
      } catch (err) {
        startSnackbar({
          variant: "error",
          content: `Transaction failed ! ${err}`,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publicKey]
  );

  return {
    stakeAction,
    refreshNfts,
    debouncedRefreshNfts,
    claimDTAC,
    claimSOL,
  };
};
export default useStakeAction;
