import { Box, Button, Link as MUILink } from "@mui/material";
import { ReactComponent as DiscordIcon } from "../../../../assets/icons/Discord-Logo-White.svg";
import useMobile from "../../../../hooks/useMobile";
import { NavLink } from "react-router-dom";
// import { CropFree } from "@mui/icons-material";
import RedButtonBg from "../../../../assets/buttons/red_angle.png";
import { ReactComponent as DiscordBar } from "../../../../assets/sections/homepage/discordButton.svg";
import HeaderMobileButton from "./HeaderMobileButton";
import { useAppDispatch } from "../../../../app/hooks";
import { setComingSoon } from "../../../../features/global/globalSlice";
import { useContext } from "react";
import { StrapiContext } from "../../../../providers/StrapiPublicProvider";
import { getStrapiMedia } from "../../../../lib/theme/media";

interface INavLink {
  title: string;
  slug: string;
}

export const TerminalButton: React.FC = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      color="error"
      // component={RouterLink}
      // to="news"
      onClick={() => dispatch(setComingSoon(true))}
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
  );
};

export const SiteNavLinks: INavLink[] = [
  {
    title: "How to buy",
    slug: "how-to-buy",
  },
  {
    title: "News",
    slug: "news",
  },
];

export type HeaderPropsType = {
  children?: any;
};

const DiscordButton = (props: any) => {
  const { children, sx, href } = props;
  return (
    <Button
      component={MUILink}
      href={href}
      target="_blank"
      rel="noopener"
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

// const HeaderButton = (props: any) => {
//   const { children, isActive } = props;
//   return (
//     <Button
//       sx={{
//         textDecoration: "none !important",
//         display: "inline-flex",
//         alignItems: "center",
//         filter: !isActive ? "brightness(1.2)" : "none",
//         opacity: !isActive ? "0.85" : "1",
//       }}
//     >
//       {isActive && <CropFree fontSize="small" sx={{ mr: 1 }} />}
//       {children}
//     </Button>
//   );
// };

const Header: React.VFC<HeaderPropsType> = ({ children }) => {
  const { logo, socials } = useContext(StrapiContext);
  const isMobile = useMobile();

  const discordItem = socials.find(
    (item: Record<any, any>) => item.name === "discord"
  );
  // *************** RENDER *************** //
  return (
    <Box component="header">
      <Box
        sx={{
          pt: isMobile ? "15px" : "20px",
          px: isMobile ? "15px" : "60px",
          pb: isMobile ? 0 : "20px",
          background:
            "linear-gradient(270.04deg, rgba(54, 240, 151, 0) 0.37%, rgba(54, 240, 151, 0.12) 46.54%, rgba(54, 240, 151, 0) 99.96%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
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
              src={getStrapiMedia(logo)}
              alt="Dark Terminal Logo"
              style={{ maxWidth: "100%" }}
            />
          </NavLink>
        </Box>
        <Box sx={{ display: { lg: "none" } }}>
          <HeaderMobileButton />
        </Box>
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          {/* {SiteNavLinks.map((item) => {
            return (
              <NavLink
                key={item.title}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  marginRight: "20px",
                }}
                to={item.slug}
              >
                {({ isActive }) => {
                  return (
                    <HeaderButton isActive={isActive}>
                      {item.title}
                    </HeaderButton>
                  );
                }}
              </NavLink>
            );
          })} */}

          <TerminalButton />
        </Box>
        {isMobile && discordItem && (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              borderBottom: (theme) =>
                `1px solid ${theme.palette.primary.main}`,
            }}
          >
            <DiscordButton
              sx={{ display: "inline-flex", alignItems: "center" }}
              href={discordItem.url}
            >
              <DiscordIcon width="26px" height="auto" />
              <Box sx={{ ml: 1 }}>JOIN DISCORD</Box>
            </DiscordButton>
          </Box>
        )}
      </Box>

      {!isMobile && discordItem && (
        <MUILink
          href={discordItem.url}
          sx={{ display: "block", width: "100%" }}
          target="_blank"
          rel="noopener"
        >
          <DiscordBar width="100%" height="auto" />
        </MUILink>
      )}
    </Box>
  );
};

export default Header;
