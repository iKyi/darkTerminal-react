import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import ExploitActiveBox from "../../../../../components/Reusable/ExploitActiveBox";
import TerminalModalWrapper from "../../../../../components/Reusable/TerminalModalWrapper";
import {
  stageSevenSubmit,
  triggerExploit,
} from "../../../../../features/game/gameActions";
import { FONTS } from "../../../../../lib/theme";
import optionBg from "../optionButtonBg.png";
import optionBgActive from "../optionButtonBgActive.png";

export type StageEightPropsType = {};

const StageEightOptions = [
  "8593",
  "2030",
  "4293",
  "1203",
  "9382",
  "0932",
  "1242",
  "8620",
  "6940",
  "3890",
];

const StageEight: React.VFC<StageEightPropsType> = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.game.actor);
  const gameData = useAppSelector((state) => state.game.game);
  const { tries, exploitActive, exploits } = userData;
  const { hacking } = gameData;

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const noTries = tries === 0;
  const hasExploits = exploits > 0;

  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper
      open
      baseWidth={746}
      redTitle
      bigTitle={
        <Box
          sx={{
            animation: !hacking ? "none" : `hackTextEffect 1s infinite ease`,
          }}
        >
          MAIN SYSTEM{" "}
          <Box
            sx={{
              display: "inline",
              color: "common.white",
              animation: !hacking ? "none" : `hackTextEffect 1s infinite ease`,
            }}
          >
            TERMINAL
          </Box>
        </Box>
      }
    >
      <Box
        sx={{
          py: 3,
          px: 4,
          fontFamily: FONTS.FURORE,
          textTransform: "uppercase",
        }}
      >
        <Box sx={{ pb: 2, fontSize: "0.85rem" }}>
          <Box sx={{ color: "primary.darker" }}>
            THE MAIN SYSTEM IS PROTECTED WITH A 4 NUMBER PIN CODE
          </Box>
          <Box sx={{ color: "primary.darker" }}>{">_"}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {StageEightOptions.map((item) => {
            return (
              <Box sx={{ p: 1 }} key={item}>
                <Button
                  className={activeItem === item ? "active" : ""}
                  onClick={() => setActiveItem(item)}
                  sx={{
                    background: `url('${optionBg}')`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    minWidth: "120px",
                    minHeight: "50px",
                    animation: !hacking
                      ? "none"
                      : `hackTextEffect 1s infinite ease`,
                    "&.active": {
                      background: `url('${optionBgActive}')`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      color: "#000",
                      textShadow: "none",
                    },
                  }}
                  disabled={noTries}
                >
                  {item}
                </Button>
              </Box>
            );
          })}
        </Box>
        <ExploitActiveBox />
        <Box
          sx={{
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <Box sx={{ pb: 2 }}>
            <Box sx={{ color: "primary.darker" }}>
              ONLY ONE PIN WILL GRANT YOU ACCESS
            </Box>
            <Box sx={{ color: "primary.darker" }}>INTO THE MAIN SYSTEM</Box>
          </Box>
          <Stack direction="row" spacing={2} sx={{ flex: 1, ml: 1 }}>
            <Button
              fullWidth
              variant="complex"
              color="secondary"
              disabled={!hasExploits || exploitActive}
              onClick={() => dispatch(triggerExploit())}
            >
              EXPLOIT NOW
            </Button>
            <Button
              fullWidth
              variant="complex"
              color="primary"
              disabled={!activeItem}
              onClick={() => dispatch(stageSevenSubmit())}
            >
              SUBMIT
            </Button>
          </Stack>
        </Box>
      </Box>
    </TerminalModalWrapper>
  );
};

export default StageEight;
