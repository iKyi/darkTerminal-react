import { Box, Button, Link as MUILink } from "@mui/material";
import { ReactComponent as DiscordIcon } from "../../../../assets/icons/Discord-Logo-White.svg";
import useMobile from "../../../../hooks/useMobile";
import { NavLink } from "react-router-dom";
// import RedButtonBg from "../../../../assets/buttons/red_angle.png";
import { ReactComponent as DiscordBar } from "../../../../assets/sections/homepage/discordButton.svg";
import HeaderMobileButton from "./HeaderMobileButton";
import { useContext } from "react";
import { StrapiContext } from "../../../../providers/StrapiPublicProvider";
import { getStrapiMedia } from "../../../../lib/theme/media";
import ActiveHeaderLinkIcon from "icons/ActiveHeaderLinkIcon";
import { PersonOutline } from "@mui/icons-material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface INavLink {
  title: string;
  slug: string;
  anchor?: string;
}

export const SiteNavLinks: INavLink[] = [
  // {
  //   title: "How to buy",
  //   slug: "/how-to-buy",
  // },
  {
    slug: "/minting",
    title: "Minting",
  },
  {
    title: "NFTS",
    slug: "/",
    anchor: "nfts",
  },
  {
    title: "Games",
    slug: "/",
    anchor: "games",
  },
  // {
  //   title: "Operations",
  //   slug: "/news",
  // },
  {
    title: "Stake",
    slug: "/stake",
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
      {isActive && <ActiveHeaderLinkIcon sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
};

const Header: React.VFC<HeaderPropsType> = ({ children }) => {
  const { logo, socials } = useContext(StrapiContext);
  const isMobile = useMobile();
  const wallet = useWallet();

  const discordItem = socials.find(
    (item: Record<any, any>) => item.name === "discord"
  );
  // *************** RENDER *************** //
  return (
    <Box
      component="header"
      sx={{ width: "100%", maxWidth: "1440px", margin: "0 auto" }}
    >
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
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
              whiteSpace: "nowrap",
              alignItems: "center",
            },
          }}
        >
          {SiteNavLinks.map((item) => {
            return (
              <NavLink
                key={item.title}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  marginRight: "20px",
                }}
                to={{ pathname: item.slug, hash: item.anchor }}
              >
                {({ isActive }) => {
                  return (
                    <HeaderButton isActive={isActive && !item.anchor}>
                      {item.title}
                    </HeaderButton>
                  );
                }}
              </NavLink>
            );
          })}

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
