import { Box } from "@mui/system";
import { useContext } from "react";
import { StrapiContext } from "../../providers/StrapiPublicProvider";
import { NavLink } from "react-router-dom";
import { getStrapiMedia } from "lib/theme/media";
import useMobile from "../../hooks/useMobile";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Stack } from "@mui/material";
import { Brightness1 } from "@mui/icons-material";

export type MintHeaderPropsType = {
  children?: any;
};

// const buttonStyle = {
//   backgroundImage: `url('${}')`
// }

const MintHeader: React.VFC<MintHeaderPropsType> = ({ children }) => {
  const data = useContext(StrapiContext);
  const isMobile = useMobile();
  const wallet = useWallet();

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "200px" : "280px",
        }}
      >
        <NavLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={getStrapiMedia(data.logo)}
            alt="Dark Terminal Logo"
            style={{ maxWidth: "100%" }}
          />
        </NavLink>
      </Box>
      <Stack spacing={2}>
        <WalletMultiButton
          className=" loginButton "
          startIcon={
            <Box
              sx={{
                fontSize: "12px",
              }}
            >
              <Brightness1
                fontSize="inherit"
                color={wallet.connected ? "primary" : "error"}
              />
            </Box>
          }
        />
        {wallet.connected && (
          <WalletDisconnectButton
            className=" logoutButton "
            startIcon={undefined}
          />
        )}
      </Stack>
    </Box>
  );
};

export default MintHeader;
