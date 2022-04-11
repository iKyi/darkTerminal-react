import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axiosGetter from "lib/axios/axiosGetter";
import { getStrapiURL } from "lib/theme/api";
import { getStrapiMedia } from "lib/theme/media";
import imageFrame from "assets/images/imageFrame.png";

export type HeroImageBoxPropsType = {
  children?: any;
};

const HeroImageBox: React.VFC<HeroImageBoxPropsType> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("home-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
    });
  }, []);
  const { heroImage, heroVideo } = data || {};

  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <Box
      sx={{
        maxWidth: "100%",
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
              background: `url('${imageFrame}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
            }}
          />
        </Box>
      ) : (
        <video autoPlay muted loop style={{ width: "100%", height: "auto" }}>
          <source src={getStrapiMedia(heroVideo)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Box>
  );
};

export default HeroImageBox;
