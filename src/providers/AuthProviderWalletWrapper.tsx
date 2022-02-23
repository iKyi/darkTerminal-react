import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export type AuthProviderWalletWrapperPropsType = {
  children?: any;
};

const AuthProviderWalletWrapper: React.VFC<
  AuthProviderWalletWrapperPropsType
> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network =
    process.env.NODE_ENV === "development" || process.env.REACT_APP_STAGING
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet;

  const endpoint =
    process.env.NODE_ENV === "development" || process.env.REACT_APP_STAGING
      ? "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899"
      : process.env.REACT_APP_RPC_URL ?? "https://ssc-dao.genesysgo.net";

  // AG: forcing mainnet on dev env for testing
  // const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = "https://ssc-dao.genesysgo.net";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AuthProviderWalletWrapper;
