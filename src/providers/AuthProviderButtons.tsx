import { GatewayProvider } from "@civic/solana-gateway-react";
import { web3 } from "@project-serum/anchor";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL, Signer } from "@solana/web3.js";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch } from "../app/hooks";
import { GENERAL_SETTINGS } from "../constants/generalSettings";
import {
  delayedSnackbarClose,
  setCandyMachineLoading,
  startSnackbar,
} from "../features/global/globalSlice";
import {
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  ICandyMachineState,
  mintOneToken,
} from "./Solana/services/candyMachine";
import { ANCHORWALLET } from "./Solana/services/connection";
import darkTerminal, {
  IDarkTerminalClass,
} from "./Solana/services/darkTerminal";

export type AuthProviderButtonsPropsType = {
  children?: any;
};

export const WalletContext = createContext<{
  wallet: ANCHORWALLET | null;
  darkTerminal: IDarkTerminalClass | null;
  candyMachine: ICandyMachineState | null;
  onMint: null | ((publicKey: PublicKey | null) => Promise<void>);
  isMinting: boolean;
}>({
  wallet: null,
  darkTerminal: null,
  candyMachine: null,
  onMint: null,
  isMinting: false,
});

const candyMachineId = new PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID ?? ""
);
export const presaleTokenPublicKey = new PublicKey(
  process.env.REACT_APP_PRESALE_TOKEN_ID ?? ""
);
export const whitelistTokenPublicKey = new PublicKey(
  process.env.REACT_APP_WHITELIST_TOKEN_ID ?? ""
);

const dtWallet = new PublicKey(process.env.REACT_APP_DT_WALLET_ID ?? "");

const AuthProviderButtons: React.VFC<AuthProviderButtonsPropsType> = ({
  children,
}) => {
  // STATIC VALUES
  const rpcUrl = process.env.REACT_APP_RPC_URL;

  // DYNAMIC VALUES
  const dispatch = useAppDispatch();
  const wallet = useWallet();
  const { publicKey, sendTransaction } = wallet;
  const { connection } = useConnection();

  // STATE VALUES
  const [darkTerminalService, setDarkTerminalService] =
    useState<IDarkTerminalClass>(new darkTerminal(connection));
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<ICandyMachineState | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alertState, setAlertState] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // EVENTS
  useEffect(() => {
    setDarkTerminalService(new darkTerminal(connection));
  }, [connection]);

  const anchorWallet: ANCHORWALLET | null = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return null;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    };
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    if (candyMachineId) {
      dispatch(setCandyMachineLoading(true));
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          candyMachineId,
          connection
        );
        setCandyMachine(cndy);
        dispatch(setCandyMachineLoading(false));
      } catch (e) {
        dispatch(setCandyMachineLoading(false));
        console.log("There was a problem fetching Candy Machine state");
        console.log(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorWallet, connection]);

  useEffect(() => {
    refreshCandyMachineState();
  }, [anchorWallet, connection, refreshCandyMachineState]);

  useEffect(() => {
    if (alertState && alertState.message.length > 0) {
      dispatch(
        startSnackbar({
          content: alertState.message,
          variant: alertState.severity,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertState]);

  // METHODS
  const onMint = async (tokenAddress: PublicKey | null | false) => {
    dispatch(delayedSnackbarClose());
    try {
      setIsUserMinting(true);
      document.getElementById("#identity")?.click();

      if (tokenAddress && publicKey) {
        const hasWhitelistToken = await darkTerminalService.hasToken(
          publicKey,
          presaleTokenPublicKey
        );
        if (!hasWhitelistToken) {
          setAlertState({
            open: true,
            message: "Not in whitelist",
            severity: "error",
          });
          throw new Error("Not in whitelist");
        }
      }

      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        // Send exchangeable token info if presale or whitelist
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let exchangeableTokenInfo = null;
        if (tokenAddress) {
          let exchangeableToken = new Token(
            connection,
            tokenAddress,
            TOKEN_PROGRAM_ID,
            wallet as unknown as Signer
          );

          const payerTokenAccount =
            await exchangeableToken.getOrCreateAssociatedAccountInfo(
              wallet.publicKey
            );
          const toTokenAccount =
            await exchangeableToken.getOrCreateAssociatedAccountInfo(dtWallet);

          const transaction = new web3.Transaction().add(
            Token.createTransferInstruction(
              TOKEN_PROGRAM_ID,
              payerTokenAccount.address,
              toTokenAccount.address,
              wallet.publicKey,
              [],
              LAMPORTS_PER_SOL
            )
          );
          const signature = await sendTransaction(transaction, connection);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await connection.confirmTransaction(
            signature,
            "confirmed"
          );
        }

        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            GENERAL_SETTINGS.TX_TIMEOUT,
            connection,
            true
          );
        }

        if (status && !status.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Purchase succeeded!",
            severity: "success",
          });
          refreshCandyMachineState();
        } else {
          setAlertState({
            open: true,
            message: "Purchase failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      let message =
        (error as any).msg || "Purchasing failed! Please try again!";
      if (!message) {
        if (!(error as any).message) {
          message = "Transaction Timeout! Please try again.";
        } else if ((error as any).message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if ((error as any).message.indexOf("0x135")) {
          message = `Insufficient funds to purchase. Please fund your wallet.`;
        }
      } else {
        if ((error as any).code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if ((error as any).code === 312) {
          message = `Purchasing period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsUserMinting(false);
    }
  };

  // *************** RENDER *************** //
  return (
    <WalletContext.Provider
      value={{
        darkTerminal: darkTerminalService,
        wallet: anchorWallet,
        candyMachine: candyMachine,
        onMint: onMint,
        isMinting: isUserMinting,
      }}
    >
      {candyMachine?.state.isActive &&
      candyMachine?.state.gatekeeper &&
      wallet.publicKey &&
      wallet.signTransaction ? (
        <GatewayProvider
          wallet={{
            publicKey: wallet.publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
            signTransaction: wallet.signTransaction,
          }}
          gatekeeperNetwork={candyMachine?.state?.gatekeeper?.gatekeeperNetwork}
          clusterUrl={rpcUrl}
          options={{ autoShowModal: false }}
        >
          {children}
        </GatewayProvider>
      ) : (
        children
      )}
    </WalletContext.Provider>
  );
};

export default AuthProviderButtons;
