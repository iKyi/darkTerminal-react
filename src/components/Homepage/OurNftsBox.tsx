import { Box, Container, Grid, Typography } from "@mui/material";
import BigSectionWrapper from "./BigSectionWrapper";
import greenImageFrame from "../../assets/images/imageFrame.png";
import redImageFrame from "../../assets/images/redImageFrame.png";
import lightImageFrame from "../../assets/images/lightImageFrame.png";
import greenTopFrame from "../../assets/images/greenTopFrame.png";
import redTopFrame from "../../assets/images/redTopFrame.png";
import lightTopFrame from "../../assets/images/lightTopFrame.png";
import { centerFlex } from "lib/sxUtils";
import imageOne from "../../assets/images/homeCardsPesentation/1.png";
import imageTwo from "../../assets/images/homeCardsPesentation/2.png";
import imageThree from "../../assets/images/homeCardsPesentation/3.png";
import { useEffect, useRef } from "react";
import { setTimeout } from "timers-browserify";
import { useLocation } from "react-router-dom";
import MarkdownParser from "../Reusable/MarkdownParser";
import { FONTS } from "lib/theme";
import FillerDivider from "./FillerDivider";

const GridCardEntry: React.FC<NFTObject> = (props: NFTObject) => {
  const { color, image, name, royal, supply } = props;

  const mainColor =
    color === "error"
      ? "error.main"
      : color === "light"
      ? "primary.light"
      : "primary.main";

  const topBorder =
    color === "error"
      ? redTopFrame
      : color === "light"
      ? lightTopFrame
      : greenTopFrame;
  const imageFrame =
    color === "error"
      ? redImageFrame
      : color === "light"
      ? lightImageFrame
      : greenImageFrame;

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url('${topBorder}')`,
          backgroundSize: "100% 100%",
          textTransform: "uppercase",
          fontSize: "0.9rem",
          color: mainColor,
          ...centerFlex,
          py: 1,
        }}
      >
        {name}
      </Box>
      <Box sx={{ position: "relative", lineHeight: 1 }}>
        <img
          src={image}
          alt="Nyx nft"
          style={{ width: "100%", height: "auto", lineHeight: 1 }}
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
            lineHeight: 1,
          }}
        />
      </Box>
      <Box sx={{ py: 1.5, width: "100%" }}>
        <Grid
          container
          sx={{
            border: () => `1px solid`,
            borderColor: mainColor,
            bgcolor:
              color === "error"
                ? `rgba(120,0,0,0.20)`
                : color === "primary"
                ? `rgba(0,120,0,0.10)`
                : `rgba(0,120,0,0.05)`,
            px: 1.5,
            py: 1,
          }}
          rowSpacing={0.6}
        >
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              ROYALTIES
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "primary.main" }}>
              {royal}%
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              SUPPLY
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "error.main" }}>
              {supply}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const title = (
  <Box component="span">
    <Box component="span" sx={{ color: "common.white" }}>
      DARK TERMINAL
    </Box>{" "}
    <Box component="span" sx={{ color: "primary.main" }}>
      NFTS
    </Box>
  </Box>
);

const textContent: string = `Holders of our collection's NFTs receive 50% of all secondary royalties and 50% of all fees taken by Dark Terminal from the games and minting services through staking.
Each NFT also features DTAC mining passively as long as it is staked.`;

interface NFTObject {
  image: any;
  name: string;
  royal: number;
  supply: number;
  color: "light" | "primary" | "error";
}

const items: NFTObject[] = [
  {
    color: "error",
    image: imageOne,
    royal: 30,
    name: "NYX",
    supply: 109,
  },
  {
    color: "primary",
    name: "D3GEN",
    image: imageTwo,
    royal: 10,
    supply: 460,
  },
  {
    color: "light",
    image: imageThree,
    name: "CODEX",
    royal: 10,
    supply: 542,
  },
];

export type OurNftsBoxPropsType = {};

const OurNftsBox: React.VFC<OurNftsBoxPropsType> = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const currentHref = window.location.href;
      if (currentHref.includes("#nfts")) {
        boxRef?.current?.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "start",
        });
      }
    }, 400);
  }, [location]);

  // *************** RENDER *************** //
  return (
    <BigSectionWrapper title={title} fRef={boxRef}>
      <Container maxWidth="md">
        <Box
          className="sectionDescription"
          sx={{
            mb: [2, 2, 4],
            fontFamily: FONTS.SOURCE,
            color: "primary.light",
            textAlign: "center",
          }}
        >
          <MarkdownParser>{textContent}</MarkdownParser>
        </Box>
        <Grid
          container
          columnSpacing={[0, 2, 4]}
          rowSpacing={[3, 3, 0]}
          justifyContent="center"
        >
          {items.map((item) => {
            return (
              <Grid key={item.name} item xs={12} sm={6} md={4}>
                <GridCardEntry {...item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <FillerDivider sx={{ mt: [3, 3, 7] }} />
    </BigSectionWrapper>
  );
};

export default OurNftsBox;
