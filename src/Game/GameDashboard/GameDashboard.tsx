import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import GameGraph from "./components/GameGraph/GameGraph";
import PlayerStatsBox from "./components/PlayerStatsBox/PlayerStatsBox";
import StageBar from "./components/StageBar/StageBar";
import TopGameStatusBar from "./components/TopGameStatusBar/TopGameStatusBar";
import bigAngleBg from "../../assets/buttons/bigAngleGreen.png";
import GlitchFont from "../../components/Reusable/GlitchFont";
import LogBox from "./components/LogBox/LogBox";
import LateStagesWrap from "./components/LateStagesWrap/LateStagesWrap";
import ExploitModal from "./components/ExploitModal";

export type GameDashboardPropsType = {
  children?: any;
};

// const lateralPadding = 3;

const AbsoluteWrapperBox: React.FC<{ children: ReactNode; sx?: SxProps }> = ({
  children,
  sx,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 100,
        backdropFilter: "blur(5px) grayscale(80%)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const GameDashboard: React.VFC<GameDashboardPropsType> = ({ children }) => {
  const hacking = useAppSelector((state) => state.game.game.hacking);
  // *************** RENDER *************** //
  return (
    <Box sx={{ position: "relative" }}>
      <GameGraph />

      <AbsoluteWrapperBox sx={{ top: 0, left: 0, pt: 2, pl: 2 }}>
        <LogBox />
      </AbsoluteWrapperBox>

      <AbsoluteWrapperBox sx={{ bottom: 0, left: 0, pl: 2, pb: 2 }}>
        <PlayerStatsBox sx={{ mt: "auto" }} />
      </AbsoluteWrapperBox>

      <AbsoluteWrapperBox
        sx={{ top: 0, width: "746px", left: "calc(50% - 373px)" }}
      >
        <TopGameStatusBar />
      </AbsoluteWrapperBox>

      {hacking && (
        <AbsoluteWrapperBox sx={{ bottom: 0, left: "calc(50% - 206px)", p: 2 }}>
          <Box
            sx={{
              background: `url('${bigAngleBg}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              width: "412px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: `hackTextEffect 1s infinite ease`,
            }}
          >
            <GlitchFont>HACKING</GlitchFont>
          </Box>
        </AbsoluteWrapperBox>
      )}

      <AbsoluteWrapperBox
        sx={{
          pr: 2,
          pb: 2,
          right: 0,
          bottom: 0,
        }}
      >
        <StageBar />
      </AbsoluteWrapperBox>
      <LateStagesWrap />
      <ExploitModal />
    </Box>
  );
};

export default GameDashboard;
