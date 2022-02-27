import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Lock, SubdirectoryArrowLeftSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import FourOhFourComp from "../FourOhFour/FourOhFourComp";
import { setComingSoon, setInfoModal } from "src/features/global/globalSlice";
import greenImageFrame from "../../assets/images/imageFrame.png";
import redImageFrame from "../../assets/images/redImageFrame.png";
import greenTopFrame from "../../assets/images/greenTopFrame.png";
import redTopFrame from "../../assets/images/redTopFrame.png";
import { centerFlex } from "../../lib/sxUtils";
import greenBars from "../../assets/images/stakeCards/greenBars.png";
import redBars from "../../assets/images/stakeCards/redBars.png";
import { ReactNode } from "react";
import { SxProps } from "@mui/system";
import useStakeAction from "src/hooks/useStakeAction";
import SeoComp from "../Reusable/Seo";

export type StakeCardEntryPropsType = {
  children?: any;
};

const boxStyles: SxProps = {
  p: [2, 2, 2.3, 2.5],
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
};

const parentBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-Start",
  width: "100%",
  img: {
    width: "auto",
    mb: 0.8,
  },
};

const colmunFullHeightSize: SxProps = {
  display: "flex",
};

const ElemTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        fontSize: ["1.1rem", "1.1rem", "1.3rem"],
        color: "primary.light",
        mb: [1.5, 1.5, 2, 2],
      }}
    >
      {children}
    </Box>
  );
};

const SectionWrapper: React.FC<{ title: string; children: ReactNode }> = ({
  children,
  title,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontSize: ["0.85rem", "0.85rem", "0.95rem", "0.95rem"],
          color: "common.white",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

const bigTextStyles: SxProps = {
  fontSize: ["1.1rem", "1.1  rem", "1.5rem"],
};

const StakeCardEntry: React.VFC<StakeCardEntryPropsType> = ({ children }) => {
  const { stakeAction } = useStakeAction();
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams();
  const data = useAppSelector((state) => state.user.tokens).find(
    (tkn) => tkn.mint === paramId
  );
  const {
    dtacRedeemValue,
    solRedeemValue,
    name,
    typeId,
    image,
    mint,
    isStaked,
  } = data || {};

  const staked = isStaked ? true : false;
  const imageFrame = staked ? redImageFrame : greenImageFrame;
  const topBorder = staked ? redTopFrame : greenTopFrame;
  const mainColor = staked ? "error.main" : "primary.main";
  // *************** METHODS  *************** //
  const startComingSoon = () => {
    dispatch(setComingSoon(true));
  };

  const localDoStake = () => {
    if (data) {
      stakeAction(mint!, name!);
    } else {
      throw new Error("Error 5231");
    }
  };

  const localDoClaim = () => {
    if (staked) {
      startComingSoon();
    } else {
      dispatch(
        setInfoModal(
          <Box sx={{ color: "error.main" }}>
            NFT needs to be staked in order to claim
          </Box>
        )
      );
    }
  };

  const seo = data
    ? {
        metaTitle: `${name} NFT #${typeId}`,
      }
    : null;
  // *************** RENDER *************** //
  if (!data) return <FourOhFourComp />;
  return (
    <Box>
      <SeoComp seo={seo} />
      <Box sx={{ mb: 2 }}>
        <Button
          size="large"
          component={RouterLink}
          to="/stake/"
          startIcon={<SubdirectoryArrowLeftSharp />}
        >
          Back
        </Button>
      </Box>
      <Box>
        <Grid
          container
          rowSpacing={[3, 2, 2, 0, 0]}
          columnSpacing={[0, 0, 3, 3]}
        >
          <Grid item xs={12} md={6} xl={4}>
            <Box
              sx={{
                width: "100%",
                backgroundImage: `url('${topBorder}')`,
                backgroundSize: "100% 100%",
                textTransform: "uppercase",
                fontSize: "1.15rem",
                color: mainColor,
                ...centerFlex,
                py: 1.4,
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
          </Grid>
          <Grid item xs={12} md={6} xl={8}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: ["1rem", "1.3rem", "1.5rem"],
                }}
              >
                <Box>
                  <Typography
                    component={"span"}
                    sx={{ color: "primary.main", fontSize: "inherit" }}
                  >
                    {name}
                  </Typography>{" "}
                  <Typography component={"span"} sx={{ fontSize: "inherit" }}>
                    NFT
                  </Typography>
                </Box>
                <Box sx={{ color: mainColor }}>
                  {staked ? "STAKED" : "UNSTAKED"}
                </Box>
              </Box>
              <Box sx={{ mt: [2, 2, 3, 3] }}>
                <Grid
                  container
                  rowSpacing={[2, 2, 0, 0]}
                  columnSpacing={[0, 0, 2, 2]}
                >
                  <Grid item xs={12} xl={6} sx={{ ...colmunFullHeightSize }}>
                    <Box sx={parentBoxStyles}>
                      <img src={greenBars} alt="green bars element" />
                      <Box
                        sx={{
                          border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                          bgcolor: `rgba(0,0,0,0.3)`,
                          ...boxStyles,
                        }}
                      >
                        <ElemTitle>DTAC</ElemTitle>
                        <SectionWrapper title="AVAILABLE DTAC">
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "primary.main" }}
                          >
                            {dtacRedeemValue}
                          </Typography>{" "}
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "primary.light" }}
                          >
                            DTAC
                          </Typography>
                        </SectionWrapper>
                        <SectionWrapper title="MINING SPEED">
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "primary.main" }}
                          >
                            1.8 dtac / hour
                          </Typography>
                          {/* <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "primary.light" }}
                          >
                            SOL
                          </Typography> */}
                        </SectionWrapper>
                        <Box sx={{ mt: "auto" }}>
                          <Button
                            fullWidth
                            variant="threeButton"
                            color="secondary"
                            onClick={localDoClaim}
                          >
                            CLAIM DTAC
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} xl={6} sx={{ ...colmunFullHeightSize }}>
                    <Box sx={parentBoxStyles}>
                      <img src={redBars} alt="red bars element" />
                      <Box
                        sx={{
                          border: (theme) =>
                            `1px solid ${theme.palette.error.main}`,
                          bgcolor: `rgba(0,0,0,0.3)`,
                          ...boxStyles,
                        }}
                      >
                        <ElemTitle>ROYALTIES</ElemTitle>
                        <SectionWrapper title="AVAILABLE SOL">
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "error.main" }}
                          >
                            {solRedeemValue}
                          </Typography>{" "}
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles, color: "primary.light" }}
                          >
                            SOL
                          </Typography>
                        </SectionWrapper>
                        <Box sx={{ mt: "auto" }}>
                          <Button
                            fullWidth
                            variant="threeButton"
                            color="secondary"
                            onClick={localDoClaim}
                          >
                            CLAIM SOL
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="angled"
                      color={staked ? "secondary" : "primary"}
                      startIcon={<Lock color={staked ? "error" : "primary"} />}
                      fullWidth
                      onClick={localDoStake}
                      disabled={staked}
                    >
                      {staked ? "CLAIM ALL & UNSTAKE" : "STAKE NOW"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {/* INNER ENDS HERe */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StakeCardEntry;
