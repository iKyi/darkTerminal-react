import { Box, Container, IconButton, Link, Stack } from "@mui/material";
import { useContext } from "react";
import { StrapiContext } from "../../../../providers/StrapiPublicProvider";

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
        <Box sx={{ fontFamily: "Furore" }}>
          <span className="TP">DARK TERMINAL</span> Ⓒ 2022
        </Box>
        <Stack spacing={1} direction="row">
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
