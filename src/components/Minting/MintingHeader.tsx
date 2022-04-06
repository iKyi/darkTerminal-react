import { NotificationsOutlined, PersonOutline } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { centerFlex } from "lib/sxUtils";
import { useLocation } from "react-router-dom";
import mintingNavLinks from "./mintingNavLinks";
import { Link as RouterLink } from "react-router-dom";
import mintRoutes from "pages/Mint/MintRoutes";

export type MintingHeaderPropsType = {};

const LoginProtector: React.FC = ({ children }) => {
  const { connected } = useWallet();
  if (!connected) return null;
  return <>{children}</>;
};

const MintingHeader: React.VFC<MintingHeaderPropsType> = () => {
  const { pathname } = useLocation();
  const { connected } = useWallet();
  // *************** RENDER *************** //
  const titleText = mintingNavLinks
    .slice()
    .reverse()
    .find((item) => item.url === pathname)?.name;
  return (
    <Box sx={{ ...centerFlex, width: "100%", py: [1, 1, 2] }}>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <LoginProtector>
          <Typography
            variant="h2"
            noWrap
            sx={{
              fontSize: [18, 18, 21],
            }}
          >
            {titleText}
          </Typography>
        </LoginProtector>
      </Box>
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <LoginProtector>
          <IconButton
            component={RouterLink}
            to={mintRoutes.NOTIFICATIONS}
            sx={{
              color: "common.lightGray",
              "&:hover": {
                color: "common.white",
              },
            }}
          >
            <NotificationsOutlined color="inherit" />
          </IconButton>
        </LoginProtector>

        <WalletMultiButton
          className=" loginButton headerGameVariant"
          startIcon={
            <Box
              sx={{
                fontSize: "12px",
              }}
            >
              <PersonOutline
                fontSize="inherit"
                color={connected ? "primary" : "error"}
              />
            </Box>
          }
        />
      </Stack>
    </Box>
  );
};

export default MintingHeader;
