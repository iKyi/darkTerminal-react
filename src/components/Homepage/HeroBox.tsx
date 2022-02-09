import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  Link as MUILink,
} from "@mui/material";
import useMobile from "../../hooks/useMobile";
import GlitchFont from "../Reusable/GlitchFont";
import GreenBg from "../../assets/sections/homepage/greenBoxBg.png";
import ImageFrame from "../../assets/images/imageFrame.png";
// import HomeVideo from "../../assets/videos/homeVideo.mp4";
import { useAppDispatch } from "../../app/hooks";
import { setComingSoon } from "../../features/global/globalSlice";
import { useEffect, useState } from "react";
import { getStrapiURL } from "../../lib/theme/api";
import axiosGetter from "../../lib/axios/axiosGetter";
import { getStrapiMedia } from "../../lib/theme/media";

export type HeroBoxPropsType = {
  heroImage: any;
  heroVideo: any;
};

const HeroBox: React.VFC<HeroBoxPropsType> = ({ heroImage, heroVideo }) => {
  const [summaryData, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("hero-summary-entries?populate=*")).then(
      (resp) => {
        setData(resp.data);
      }
    );
  }, []);

  const dispatch = useAppDispatch();
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
              p: !isMobile ? 5.5 : 0.5,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {heroImage && heroImage.data && !heroVideo?.data ? (
              <Box sx={{ position: "relative" }}>
                <img
                  src={getStrapiMedia(heroImage)}
                  alt="Nyx nft"
                  style={{ width: "100%", height: "auto" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `url('${ImageFrame}')`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center center",
                  }}
                />
              </Box>
            ) : (
              <video
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "auto" }}
              >
                <source src={getStrapiMedia(heroVideo)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
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
            {summaryData &&
              summaryData.map((item: Record<any, any>) => {
                const { attributes } = item;
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ p: 2.5 }}
                    key={attributes.value}
                  >
                    <Box
                      sx={{ fontFamily: "Furore", textTransform: "uppercase" }}
                    >
                      {attributes.title}
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "Furore",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#36F097",
                        textTransform: "uppercase",
                      }}
                    >
                      {attributes.value}
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
          <Stack direction="row" sx={{ pt: 2 }}>
            <Box sx={{ p: 1.5, width: "100%" }}>
              <Button
                fullWidth
                variant="threeButton"
                color="primary"
                onClick={() => dispatch(setComingSoon(true))}
              >
                MINT NOW
              </Button>
            </Box>
            <Box sx={{ p: 1.5, width: "100%" }}>
              <Button
                fullWidth
                variant="threeButton"
                color="secondary"
                component={MUILink}
                href="https://darkterminal.io/darkterminal_whitepaper_v0.4.pdf"
                target="_blank"
                rel="noopener"
              >
                WHITE PAPER
              </Button>
            </Box>
          </Stack>
          {/* <Link to="how-to-buy" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "#fff" }}>
              <InfoTwoTone color="primary" sx={{ mr: 1 }} />
              How to play
            </Button>
          </Link> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroBox;
