import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { useAppDispatch } from "src/app/hooks";
import { startSnackbar } from "src/features/global/globalSlice";
import {
  setdatacBalance,
  setSolana,
  writeUserNftData,
} from "src/features/user/userSlice";
import { DarkTerminalServiceProvider } from "src/providers/AuthDarkTerminalClassWrapper";
import { useDebouncedCallback } from "use-debounce";

const useStakeAction = () => {
  const { darkTerminal } = useContext(DarkTerminalServiceProvider);
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { publicKey } = wallet;

  const refreshNfts = useCallback(async () => {
    dispatch(writeUserNftData([]));
    dispatch(setSolana(null));
    dispatch(setdatacBalance(null));
    if (publicKey && darkTerminal) {
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
      ]);
      dispatch(setSolana(solana));
      dispatch(setdatacBalance(dtac));
      dispatch(writeUserNftData(tokens));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkTerminal, publicKey]);

  const debouncedRefreshNfts = useDebouncedCallback(refreshNfts, 1000);

  const stakeAction = useCallback(
    async (mint: string) => {
      if (darkTerminal) {
        const txId = await darkTerminal.transferNft(
          new PublicKey(mint),
          wallet,
          new PublicKey(process.env.REACT_APP_STAKING_ACCOUNT_PUBLIC_KEY || "")
        );
        dispatch(
          startSnackbar({
            variant: "success",
            content: `Transaction ${txId} successful !`,
          })
        );
        debouncedRefreshNfts();
      }

      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [darkTerminal, wallet]
  );

  return { stakeAction, refreshNfts, debouncedRefreshNfts };
};
export default useStakeAction;
