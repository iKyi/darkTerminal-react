import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import Logo from "assets/images/bigLogo.png";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";
import AltLogo from "assets/images/altLogo.png";
import { centerFlex } from "lib/sxUtils";
import LeftNavItems from "./Urls/MintLeftNavLinks";

export type DashboardLeftMenuMainPropsType = {};

const DashboardLeftMenuMain: React.VFC<DashboardLeftMenuMainPropsType> = () => {
  const { connected: wallet } = useWallet();
  // *************** RENDER *************** //
  return (
    <Box>
      <Toolbar>
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            py: [1, 1, 3],
            px: [0.7, 0.7, 2],
          }}
        >
          <img
            src={Logo}
            alt="Alt logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </Toolbar>
      {wallet && (
        <List
          sx={{
            px: 2,
          }}
        >
          {LeftNavItems.map((item) => (
            <Box
              key={item.url}
              sx={{
                mb: 2,
                "&:last-of-type": {
                  mb: 0,
                },
              }}
            >
              <RouterNavLink
                to={item.url}
                style={{ textDecoration: "none" }}
                end
              >
                {({ isActive }) => {
                  return (
                    <ListItem
                      button
                      sx={{
                        border: "1px solid",
                        borderColor: isActive ? "primary.main" : "transparent",
                        color: isActive ? "primary.main" : "common.lightGray",
                        textDecoration: "none",
                        py: 0.4,
                      }}
                      secondaryAction={
                        isActive && (
                          <Box sx={centerFlex}>
                            <img
                              src={AltLogo}
                              alt="alt logo small"
                              style={{ width: 24 }}
                            />
                          </Box>
                        )
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <item.icon
                          color={isActive ? "primary" : "common.lightGray"}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ color: "inherit" }}
                      />
                    </ListItem>
                  );
                }}
              </RouterNavLink>
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DashboardLeftMenuMain;
