import { Button, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import disabledBoxBg from "assets/images/binary/disabledBg.png";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const ImageBgProps: SxProps = {
  background: `url('${disabledBoxBg}')`,
  backgroundSize: "auto 210px",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
};

export type LoginBoxPropsType = {};

const LoginBox: React.VFC<LoginBoxPropsType> = () => {
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const triggerWalletModal = () => {
    setWalletModalVisible(true);
  };
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 3,
        textAlign: "center",
        ...ImageBgProps,
      }}
    >
      <Typography variant="h5" sx={{ mb: [4, 4, 10], color: "primary.main" }}>
        CONNECT WALLET TO PLAY
      </Typography>
      <Button onClick={triggerWalletModal} variant="complex" color="primary">
        Connect Wallet
      </Button>
    </Box>
  );
};

export default LoginBox;
