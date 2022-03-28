import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useState } from "react";
import DashboardLeftMenuMain from "pages/Mint/Sub/DashboardLeftMenuMain";

export type MintingDashboardWrapperPropsType = {
  children?: any;
};
const drawerWidth = 240;

const MintingDashboardWrapper: React.VFC<MintingDashboardWrapperPropsType> = ({
  children,
}) => {
  // *************** COMPUTED VALUES *************** //
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
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
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
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default MintingDashboardWrapper;
