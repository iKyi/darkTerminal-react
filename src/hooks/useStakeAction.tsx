import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { useAppDispatch } from "src/app/hooks";
import { startSnackbar } from "src/features/global/globalSlice";
import { setTokens } from "src/features/user/userSlice";
import { DarkTerminalServiceProvider } from "src/providers/AuthDarkTerminalClassWrapper";
import { useDebouncedCallback } from "use-debounce";

const useStakeAction = () => {
  const { darkTerminal } = useContext(DarkTerminalServiceProvider);
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { publicKey } = wallet;

  const refreshNfts = useCallback(() => {
    dispatch(setTokens([]));
    if (publicKey && darkTerminal) {
      darkTerminal
        .getNFTs(
          publicKey.toBase58(),
          process.env.REACT_APP_UPDATE_AUTHORITY || "",
          process.env.REACT_APP_NFT_SYMBOL || ""
        )
        .then((tokens) => {
          dispatch(setTokens(tokens));
        });
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
