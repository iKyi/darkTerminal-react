import { Box, SxProps } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import leftStatus from "./leftStatus.png";
import rightStatus from "./rightStatus.png";
import bottomBar from "./bottomBar.png";
import centerBg from "./centerBg.png";
import { FONTS } from "../../../../lib/theme";
import { ReactNode } from "react";

export type TopGameStatusBarPropsType = {
  children?: any;
};

const SmallValue: React.VFC<{ children: string; sx?: SxProps }> = ({
  children,
  sx,
}) => {
  return (
    <Box
      sx={{
        fontFamily: FONTS.FURORE,
        color: "common.gray",
        fontSize: "0.75rem",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const NumberValue: React.VFC<{
  children: string | number;
  sx?: SxProps;
  red?: boolean;
}> = ({ children, sx, red }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        fontFamily: FONTS.FURORE,
        fontSize: "1.3rem",
        ...sx,
      }}
    >
      <Box sx={{ color: !red ? "primary.main" : "error.main" }}>{children}</Box>
      <Box sx={{ color: "common.white", ml: 0.8 }}>PLAYERS</Box>
    </Box>
  );
};

const WrapperBox: React.VFC<{ children: ReactNode; image: string }> = ({
  children,
  image,
}) => {
  return (
    <Box
      sx={{
        background: `url('${image}')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        paddingTop: 2,
        paddingBottom: 2,
        textAlign: "center",
        paddingLeft: 7,
        paddingRight: 7,
      }}
    >
      {children}
    </Box>
  );
};

const TopGameStatusBar: React.VFC<TopGameStatusBarPropsType> = ({
  children,
}) => {
  const gameStatus = useAppSelector((state) => state.game.status);
  const { playersCount } = gameStatus;
  const { main, secondary, tertiary } = playersCount ?? {};
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: `url('${bottomBar}')`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "70% auto",
          paddingBottom: "15px",
        }}
      >
        <WrapperBox image={leftStatus}>
          <SmallValue>IN SECONDARY SYSTEM</SmallValue>
          <NumberValue>{secondary}</NumberValue>
        </WrapperBox>

        <Box
          sx={{
            py: 4,
            px: 5,
            textAlign: "center",
            background: `url('${centerBg}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            mx: -2.5,
          }}
        >
          <SmallValue>IN MAIN SYSTEM</SmallValue>
          <NumberValue red sx={{ fontSize: "1.9rem", lineHeight: 1.1 }}>
            {main}
          </NumberValue>
        </Box>
        <WrapperBox image={rightStatus}>
          <SmallValue>IN TERTIARY SYSTEM</SmallValue>
          <NumberValue>{tertiary}</NumberValue>
        </WrapperBox>
      </Box>
    </Box>
  );
};

export default TopGameStatusBar;
