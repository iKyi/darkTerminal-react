import { Box, CardActionArea, CircularProgress } from "@mui/material";
import MintBoxRedBorder from "../../assets/images/mint/MintBoxRedBorder.png";
import MintBoxWhiteBorder from "../../assets/images/mint/MintBoxWhiteBorder.png";
import { FONTS } from "../../lib/theme";
import redButtonBg from "../../assets/images/mint/redButtonBg.png";
import whiteButtonBg from "../../assets/images/mint/whiteButtonBg.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { useGateway, GatewayStatus } from "@civic/solana-gateway-react";
import { WalletContext } from "../../providers/AuthProviderButtons";

export type MintBoxPropsType = {
  onClick: any;
  disabled: boolean;
  type: string;
  progress: boolean;
};

const MintBox: React.FC<MintBoxPropsType> = ({
  onClick,
  disabled,
  type,
  progress,
}) => {
  const { candyMachine, isMinting } = useContext(WalletContext);
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [clicked, setClicked] = useState<boolean>(false);

  const wallet = useWallet();
  const { connected: walletActive } = wallet;

  useEffect(() => {
    if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
      onClick();
      setClicked(false);
    }
  }, [gatewayStatus, clicked, setClicked, onClick]);

  const loading = !candyMachine || candyMachine.state === undefined;

  // *************** RENDER *************** //
  return (
    <CardActionArea
      onClick={async () => {
        setClicked(true);
        if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
          if (gatewayStatus === GatewayStatus.ACTIVE) {
            setClicked(true);
          } else {
            await requestGatewayToken();
          }
        } else {
          await onClick();
          setClicked(false);
        }
      }}
      disabled={
        loading ||
        disabled ||
        candyMachine?.state.isSoldOut ||
        isMinting ||
        !candyMachine?.state.isActive
      }
      sx={{
        background: `url('${
          progress ? MintBoxRedBorder : MintBoxWhiteBorder
        }')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        pt: "40px",
        position: "relative",
      }}
    >
      {(loading || isMinting) && (
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.65)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            fontFamily: FONTS.FURORE,
            color: "primary.light",
            textTransform: "uppercase",
            fontSize: "1rem",
            mb: 1,
          }}
        >
          {type}
        </Box>
        <Box
          sx={{
            fontFamily: FONTS.FURORE,
            color: progress ? "error.main" : "primary.main",
            fontSize: "1.3rem",
          }}
        >
          {progress ? "IN PROGRESS" : "CLOSED"}
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          fontFamily: FONTS.FURORE,
          fontSize: !walletActive && progress ? "0.8rem" : "1.1rem",
          background: `url('${
            progress && walletActive ? redButtonBg : whiteButtonBg
          }')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: progress ? "error.main" : "common.gray",
        }}
      >
        {!progress
          ? "MINT NOW"
          : !candyMachine || !candyMachine.state.isActive
          ? "Mint server off"
          : !walletActive && progress
          ? "SELECT WALLET"
          : "MINT NOW"}
      </Box>
    </CardActionArea>
  );
};

export default MintBox;
