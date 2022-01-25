import { Box, Container, IconButton, Link, Stack } from "@mui/material";
import Socials from "../../../../constants/Socials";

export type FooterPropsType = {
  children?: any;
};

const Footer: React.VFC<FooterPropsType> = ({ children }) => {
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
          <span className="TP">DARK TERMINAL</span> Ⓒ 2021
        </Box>
        <Stack spacing={1} direction="row">
          {Socials.map((item) => {
            return (
              <Link
                key={item.icon}
                component={IconButton}
                variant="button"
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
              </Link>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
