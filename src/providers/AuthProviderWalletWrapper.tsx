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
  // *************** RENDER *************** //
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;
  // You can also provide a custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // TODO move in config / env
  const endpoint = "https://ssc-dao.genesysgo.net";
  const rpcUrl = process.env.REACT_APP_RPC_URL; //"https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899";

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
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
    <ConnectionProvider endpoint={rpcUrl ?? endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AuthProviderWalletWrapper;
