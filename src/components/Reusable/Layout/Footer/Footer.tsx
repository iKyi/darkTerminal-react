import { Box, Container, IconButton, Link, Stack } from "@mui/material";
import { useContext } from "react";
import { StrapiContext } from "../../../../providers/StrapiPublicProvider";
import footerLogo from "../../../../assets/images/logoFooter.png";
import { Link as RouterLink } from "react-router-dom";

export type FooterPropsType = {
  children?: any;
};

const Footer: React.VFC<FooterPropsType> = ({ children }) => {
  const { socials } = useContext(StrapiContext);
  // *************** RENDER *************** //
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3.5,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={(theme) => ({
            fontFamily: "Furore",
            [theme.breakpoints.up("md")]: {
              width: "250px",
            },
          })}
        >
          <span className="TP">DARK TERMINAL</span> Ⓒ{" "}
          <Box
            style={{ display: "inline", color: "#fff", textDecoration: "none" }}
          >
            2022
          </Box>
        </Box>
        <Box
          sx={{
            display: ["none", "none", "flex"],
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
          }}
        >
          <RouterLink to="/">
            <img src={footerLogo} alt="footer logo" style={{ width: "100%" }} />
          </RouterLink>
        </Box>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="flex-end"
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              width: "250px",
            },
          })}
        >
          {socials &&
            socials.map((item: Record<any, any>) => {
              return (
                <IconButton
                  key={item.icon}
                  component={Link}
                  variant="button"
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    textDecoration: "none",
                    borderRadius: 0,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "secondary.main",
                    color: "#fff",
                    fontSize: "1.2rem",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <i className={`lni lni-${item.icon}`} />
                </IconButton>
              );
            })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
