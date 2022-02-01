import { Drawer, IconButton, List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonLogo from "../../../../assets/sections/homepage/indicatorBox.png";
import Logo from "../../../../assets/images/logo.png";
import { SiteNavLinks, TerminalButton } from "./Header";
import { NavLink } from "react-router-dom";
import { CropFree } from "@mui/icons-material";

const HeaderMobileButton: React.VFC = () => {
  const [open, setOpen] = useState<boolean>(false);

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
          <List>
            {SiteNavLinks.map((item) => {
              return (
                <ListItem
                  key={item.title}
                  component={NavLink}
                  to={item.slug}
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
                  }}
                >
                  <Box
                    className="iconSpace"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <CropFree fontSize="small" sx={{ mr: 1 }} />
                  </Box>
                  {item.title}
                </ListItem>
              );
            })}
          </List>
          <TerminalButton />
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderMobileButton;
