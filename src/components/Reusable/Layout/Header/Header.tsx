import { Box, Button, Link as MUILink } from "@mui/material";
import { ReactComponent as DiscordIcon } from "../../../../assets/icons/Discord-Logo-White.svg";
import useMobile from "../../../../hooks/useMobile";
import Logo from "../../../../assets/images/logo.png";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { CropFree } from "@mui/icons-material";
import useGetGlobal from "../../../../dataHooks/useGetGlobal";
import RedButtonBg from "../../../../assets/buttons/red_angle.png";
import { ReactComponent as DiscordBar } from "../../../../assets/sections/homepage/discordButton.svg";

export type HeaderPropsType = {
  children?: any;
};

const DiscordButton = (props: any) => {
  const { children, sx, href } = props;
  return (
    <Button
      component={MUILink}
      href={href}
      sx={{
        mt: 2,
        borderStyle: "solid",
        borderColor: "primary.main",
        borderWidth: "1px",
        borderBottomWidth: "0",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

const HeaderButton = (props: any) => {
  const { children, isActive } = props;
  return (
    <Button
      sx={{
        textDecoration: "none !important",
        display: "inline-flex",
        alignItems: "center",
        filter: !isActive ? "brightness(1.2)" : "none",
        opacity: !isActive ? "0.85" : "1",
      }}
    >
      {isActive && <CropFree fontSize="small" sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
};

const Header: React.VFC<HeaderPropsType> = ({ children }) => {
  const isMobile = useMobile();
  const { discord: discordUrl } = useGetGlobal();

  // *************** RENDER *************** //
  return (
    <Box component="header">
      <Box
        sx={{
          py: isMobile ? "15px" : "20px",
          px: isMobile ? "15px" : "60px",
          backgroundColor: "rgba(54, 255, 151, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "120px" : "280px",
          }}
        >
          <NavLink to="/" style={{ display: "block" }}>
            <img
              src={Logo}
              alt="Dark Terminal Logo"
              style={{ maxWidth: "100%" }}
            />
          </NavLink>
        </Box>
        <Box>
          <NavLink
            style={{
              textDecoration: "none",
              display: "inline-block",
              marginRight: "10px",
            }}
            to="how-to-buy"
          >
            {({ isActive }) => {
              return (
                <HeaderButton isActive={isActive}>How to buy </HeaderButton>
              );
            }}
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", marginRight: "15px" }}
            to="news"
          >
            {({ isActive }) => {
              return <HeaderButton isActive={isActive}>News </HeaderButton>;
            }}
          </NavLink>
          <RouterLink style={{ textDecoration: "none" }} to="news">
            <Button
              variant="outlined"
              color="error"
              sx={{
                border: "none",
                background: `url('${RedButtonBg}')`,
                backgroundSize: "100% 100% !important",
                pt: 1.5,
                pb: 1.1,
                "&:hover": {
                  border: "none",
                },
              }}
            >
              {">_"} Enter Terminal
            </Button>
          </RouterLink>
        </Box>
      </Box>
      {isMobile ? (
        <Box
          sx={{
            textAlign: "center",
            borderStyle: "solid",
            backgroundColor: "rgba(54, 255, 151, 0.1)",
            borderColor: "primary.main",
            borderWidth: "1px",
            borderTop: 0,
          }}
        >
          <MUILink href={discordUrl} style={{ textDecoration: "none" }}>
            <DiscordButton
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <DiscordIcon width="26px" height="auto" />
              <Box sx={{ ml: 1 }}>JOIN DISCORD</Box>
            </DiscordButton>
          </MUILink>
        </Box>
      ) : (
        <MUILink href={discordUrl} sx={{ display: "block", width: "100%" }}>
          <DiscordBar width="100%" height="auto" />
        </MUILink>
      )}
    </Box>
  );
};

export default Header;
