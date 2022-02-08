import { Stack, Box } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import greenBg from "./greenStageBg.png";
import redBg from "./redStageBg.png";
import whiteBg from "./whiteStageBg.png";
import altLogo from "../../../../assets/images/altLogo.png";
import { FONTS } from "../../../../lib/theme";
import { ReactNode } from "react-markdown/lib/react-markdown";
import { useMemo } from "react";

export type StageBarPropsType = {
  children?: any;
};

const StageBar: React.VFC<StageBarPropsType> = ({ children }) => {
  const activeSequence = useAppSelector((state) => state.game.game.sequence);
  const levelsAmount = useAppSelector((state) => state.game.game.stageAmount);

  const stagesRender = useMemo(() => {
    const renderItems: ReactNode[] = [];
    for (let index = 0; index < levelsAmount; index++) {
      renderItems.push(
        <Box
          key={index}
          sx={{
            background:
              index === activeSequence
                ? `url('${whiteBg}')`
                : index < activeSequence
                ? `url('${greenBg}')`
                : index === 8
                ? `url('${redBg}')`
                : `url('${greenBg}')`,
            width: "60px",
            height: "47px",
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: index === 8 ? "error.main" : "common.white",
          }}
        >
          {index === 0 || index < activeSequence ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(180deg, rgba(54, 240, 151, 0.21) 0%, rgba(54, 240, 151, 0) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={altLogo} alt="Alt Logo" />
            </Box>
          ) : (
            <Box sx={{ fontFamily: FONTS.FURORE }}>0{index}</Box>
          )}
        </Box>
      );
    }
    return renderItems;
  }, [activeSequence, levelsAmount]);

  // *************** RENDER *************** //
  return (
    <Stack spacing={2} direction="column-reverse">
      {stagesRender}
    </Stack>
  );
};

export default StageBar;
