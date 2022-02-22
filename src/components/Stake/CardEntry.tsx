import { CardActionArea, Grid, Typography } from "@mui/material";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import ImageFrame from "../../assets/images/imageFrame.png";
import redImageFrame from "../../assets/images/redImageFrame.png";
import greenTopFrame from "../../assets/images/greenTopFrame.png";
import redTopFrame from "../../assets/images/greenTopFrame.png";
import { centerFlex } from "../../lib/sxUtils";
import threeButtonWhite from "../../assets/buttons/threeWhite.png";
import redContent from "../../assets/images/stakeCards/redContent.png";
import greenContent from "../../assets/images/stakeCards/greenContent.png";

export type CardEntryPropsType = {
  data: ITokenCustomEntry;
};

const CardEntry: React.VFC<CardEntryPropsType> = ({ data }) => {
  const { image, mint } = data;

  const staked = false;

  const mainColor = staked ? "error.main" : "primary.main";
  const topBorder = staked ? redTopFrame : greenTopFrame;
  const imageFrame = staked ? redImageFrame : ImageFrame;
  const contentBg = staked ? redContent : greenContent;

  // *************** RENDER *************** //
  return (
    <CardActionArea
      component={RouterLink}
      to={`/stake/${mint}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
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
        unstaked
      </Box>
      <Box sx={{ position: "relative" }}>
        <img
          src={image}
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
      <Box sx={{ pt: 3, pb: 2, width: "100%" }}>
        <Grid
          container
          sx={{
            background: `url('${contentBg}')`,
            backgroundSize: "100% 100%",
            pt: 3.3,
            pb: 1,
            px: 3,
          }}
          rowSpacing={0.6}
        >
          <Grid item xs={9}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              DTAC REDEEMABLE
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.85rem", color: "primary.main" }}>
              500.00
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              SOL REDEEMABLE
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.85rem", color: "error.main" }}>
              3.5
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "auto",
          background: `url('${threeButtonWhite}')`,
          backgroundSize: "100% 100%",
          pt: 2,
          pb: 1,
          px: 1,
          color: "common.white",
          ...centerFlex,
        }}
      >
        VIEW DETAILS
      </Box>
    </CardActionArea>
  );
};

export default CardEntry;
