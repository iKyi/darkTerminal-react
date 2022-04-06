import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Button,
  SxProps,
} from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useState } from "react";
import DashboardLeftMenuMain from "components/Minting/DashboardLeftMenuMain";
import useMobile from "hooks/useMobile";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import MintingHeader from "./MintingHeader";

const paperStyles: SxProps = {
  background: "radial-gradient(50% 50% at 50% 50%, #000000 0%, #000000 100%)",
  borderRight: "1px solid",
  borderImageSlice: 1,
  borderImageSource:
    "linear-gradient(0deg, rgba(54, 240, 151, 0) -0.93%, #36F097 47.05%, rgba(54, 240, 151, 0) 99.21%)",
};

export type MintingDashboardWrapperPropsType = {
  children?: any;
};

const drawerWidth = 280;

const MintingDashboardWrapper: React.VFC<MintingDashboardWrapperPropsType> = ({
  children,
}) => {
  // *************** COMPUTED VALUES *************** //
  const { connected: wallet } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const triggerWalletModal = () => {
    setWalletModalVisible(true);
  };
  const mobile = useMobile();
  const container = window !== undefined ? window.document.body : undefined;

  // *************** LOCAL STATE *************** //
  const [mobileOpen, setMobileOpen] = useState(false);

  // *************** METHODS *************** //

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // *************** RENDER *************** //
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOpen />
          </IconButton>
          <MintingHeader />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: paperStyles,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DashboardLeftMenuMain />
        </Drawer>
        <Drawer
          PaperProps={{
            sx: paperStyles,
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DashboardLeftMenuMain />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* filler element */}
        <Toolbar />
        {!wallet ? (
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
        ) : (
          <Box>{children}</Box>
        )}
      </Box>
    </Box>
  );
};

export default MintingDashboardWrapper;
