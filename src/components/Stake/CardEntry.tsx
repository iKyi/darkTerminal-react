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

export type CardEntryPropsType = {
  data: ITokenCustomEntry;
};

const CardEntry: React.VFC<CardEntryPropsType> = ({ data }) => {
  const { image, mint, name, typeId, solRedeemValue, dtacRedeemValue } = data;

  const staked = false;

  const mainColor = staked ? "error.main" : "primary.main";
  const topBorder = staked ? redTopFrame : greenTopFrame;
  const imageFrame = staked ? redImageFrame : ImageFrame;

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
        {name} #{typeId}
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
      <Box sx={{ py: 1.5, width: "100%" }}>
        <Grid
          container
          sx={{
            border: (theme) =>
              `1px solid ${
                staked ? theme.palette.error.main : theme.palette.primary.main
              }`,
            bgcolor: staked ? `rgba(120,0,0,0.20)` : `rgba(0,120,0,0.10)`,
            px: 1.5,
            py: 1,
          }}
          rowSpacing={0.6}
        >
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              STAKED
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: staked ? "error.main" : "primary.main",
              }}
            >
              {staked ? "STAKED" : "UNSTAKED"}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              DTAC REDEEMABLE
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "primary.main" }}>
              {dtacRedeemValue}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "0.85rem", color: "common.white" }}>
              SOL REDEEMABLE
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.75rem", color: "error.main" }}>
              {solRedeemValue}
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
