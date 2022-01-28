import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import useMobile from "../../hooks/useMobile";
import GlitchFont from "../Reusable/GlitchFont";
import GreenBg from "../../assets/sections/homepage/greenBoxBg.png";
import HomeVideo from "../../assets/videos/homeVideo.mp4";
import { Link } from "react-router-dom";
import { InfoTwoTone } from "@mui/icons-material";

export type HeroBoxPropsType = {
  children?: any;
};

const HeroBox: React.VFC<HeroBoxPropsType> = ({ children }) => {
  const isMobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: !isMobile ? 5.5 : 3.5,
      }}
    >
      <Grid container columnSpacing={isMobile ? 0 : 5}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxWidth: "100%",
              p: 5.5,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <video
              autoPlay
              muted
              loop
              style={{ width: "100%", height: "auto" }}
            >
              <source src={HomeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ pt: 3.5 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "2.3rem",
                lineHeight: 1.1,
              }}
            >
              OPEN UP
            </Typography>
            <GlitchFont
              sx={{
                color: "primary.main",
                fontSize: "2.3rem",
                lineHeight: 1.1,
              }}
            >
              YOUR TERMINAL
            </GlitchFont>
          </Box>
          <Grid
            container
            sx={{
              mt: 4.5,
              py: 5.5,
              px: 3,
              background: `url('${GreenBg}')`,
              backgroundSize: "100% 100%",
            }}
          >
            <Grid item xs={12} sm={6} sx={{ p: 2.5 }}>
              <Box sx={{ fontFamily: "Furore" }}>TOTAL SUPPLY</Box>
              <Box
                sx={{
                  fontFamily: "Furore",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                TOTAL SUPPLY 00099
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 2.5 }}>
              <Box sx={{ fontFamily: "Furore" }}>TOTAL SUPPLY</Box>
              <Box
                sx={{
                  fontFamily: "Furore",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                TOTAL SUPPLY 00099
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 2.5 }}>
              <Box sx={{ fontFamily: "Furore" }}>TOTAL SUPPLY</Box>
              <Box
                sx={{
                  fontFamily: "Furore",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                TOTAL SUPPLY 00099
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 2.5 }}>
              <Box sx={{ fontFamily: "Furore" }}>TOTAL SUPPLY</Box>
              <Box
                sx={{
                  fontFamily: "Furore",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                TOTAL SUPPLY 00099
              </Box>
            </Grid>
          </Grid>
          <Stack direction="row" sx={{ pt: 2 }}>
            <Box sx={{ p: 1.5, width: "100%" }}>
              <Button fullWidth variant="threeButton" color="primary">
                PREMINT NOW
              </Button>
            </Box>
            <Box sx={{ p: 1.5, width: "100%" }}>
              <Button fullWidth variant="threeButton" color="secondary">
                WHITE PAPER
              </Button>
            </Box>
          </Stack>
          <Link to="how-to-buy" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#fff" }}>
              <InfoTwoTone color="primary" sx={{ mr: 1 }} />
              How to play
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroBox;
