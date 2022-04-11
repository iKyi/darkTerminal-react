import { Drawer, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonLogo from "../../../../assets/sections/homepage/indicatorBox.png";
import Logo from "../../../../assets/images/logo.png";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PersonOutline } from "@mui/icons-material";
import { useWallet } from "@solana/wallet-adapter-react";
// import ActiveHeaderLinkIcon from "src/icons/ActiveHeaderLinkIcon";
// import { SiteNavLinks } from "./Header";
// import { NavLink } from "react-router-dom";

const HeaderMobileButton: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const wallet = useWallet();

  // *************** RENDER *************** //
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <img src={ButtonLogo} alt="Open Mobile Button" />
      </IconButton>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, height: "100%", p: 3, bgcolor: "primary.dark" }}>
          <Box>
            <img
              src={Logo}
              style={{ width: "100%" }}
              alt="immortal arena logo"
            />
          </Box>
          {/* <List>
            {SiteNavLinks.map((item) => {
              return (
                <ListItem
                  key={item.title}
                  component={NavLink}
                  to={{ pathname: item.slug, hash: item.anchor }}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={`${item.anchor ? "hasAnchor" : ""}`}
                  sx={{
                    textDecoration: "none !important",
                    display: "inline-flex",
                    alignItems: "center",
                    color: "primary.main",
                    "&:not(.active)": {
                      filter: "brightness(1.2)",
                      opacity: "0.85",
                      ".iconSpace": {
                        display: "none",
                      },
                    },
                    "&.hasAnchor": {
                      ".iconSpace": {
                        display: "none !important",
                      },
                    },
                  }}
                >
                  <Box
                    className="iconSpace"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <ActiveHeaderLinkIcon sx={{ mr: 1 }} />
                  </Box>
                  {item.title}
                </ListItem>
              );
            })}
          </List> */}
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
                  color={wallet.connected ? "primary" : "error"}
                />
              </Box>
            }
          />
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderMobileButton;
