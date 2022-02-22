import { Box, Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAppSelector } from "src/app/hooks";
import useMobile from "src/hooks/useMobile";
import CardGrid from "./CardGrid";

export type StakeIndexPropsType = {};

const StakeIndex: React.VFC<StakeIndexPropsType> = () => {
  const { tokens } = useAppSelector((state) => state.user);
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const { wallet } = useWallet();
  const triggerWalletModal = () => {
    setWalletModalVisible(true);
  };
  const mobile = useMobile();

  // *************** RENDER *************** //
  if (!wallet) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: !mobile ? "300px" : "0",
        }}
      >
        <Button variant="redSharp" onClick={triggerWalletModal}>
          Connect Wallet
        </Button>
      </Box>
    );
  }
  return <CardGrid tokens={tokens} />;
};

export default StakeIndex;
