import statBoxBg from "./statBoxBg.png";
import { SxProps, Box, Button, IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { FONTS } from "../../../../lib/theme";
import { triggerExploit } from "../../../../features/game/gameActions";
import ExploitActiveBox from "../../../../components/Reusable/ExploitActiveBox";

export type PlayerStatsBoxPropsType = {
  sx?: SxProps;
};

const PlayerStatsBox: React.VFC<PlayerStatsBoxPropsType> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const gameData = useAppSelector((state) => state.game.game);
  const playerData = useAppSelector((state) => state.game.actor);
  const { dtac, sol, tries, exploits, exploitActive } = playerData;
  const { sequence } = gameData;
  const hasExploits = exploits > 0;
  const startStage = sequence >= 5;
  // *************** RENDER *************** //
  return (
    <>
      {!exploitActive && hasExploits && startStage ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Button
            fullWidth
            variant="complex"
            color="secondary"
            disabled={!hasExploits || exploitActive}
            onClick={() => dispatch(triggerExploit())}
          >
            EXPLOIT NOW ({exploits})
          </Button>
        </Box>
      ) : exploitActive && startStage ? (
        <ExploitActiveBox />
      ) : null}
      <Box
        sx={{
          background: `url('${statBoxBg}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          pt: 4,
          px: 2,
          pb: 3,
          display: "flex",
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              fontFamily: FONTS.FURORE,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            <Box sx={{ color: "primary.main" }}>{sol} </Box>
            <Box sx={{ ml: 1 }}>SOL</Box>
            <Box sx={{ color: "common.gray", mx: 1 }}>/</Box>
            <Box sx={{ color: "primary.main" }}>{dtac}</Box>
            <Box sx={{ ml: 1 }}>DTAC</Box>
          </Box>
          <Box
            sx={{
              fontSize: "2rem",
              lineHeight: 1,
              fontFamily: FONTS.FURORE,
              my: 1,
            }}
          >
            <Box sx={{ display: "inline", color: "error.main" }}>{tries}</Box>
            <Box sx={{ ml: 1, display: "inline", color: "common.white" }}>
              TRIES
            </Box>
          </Box>
          <Button variant="redSharp">ACTIVATE MORE ITEMS</Button>
        </Box>
        <Box sx={{ pl: 1.5 }}>
          <IconButton
            sx={{
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
              transition: "all .2s",
              borderRadius: "100%",
              backgroundColor: "primary.dark",
              "&:hover": {
                color: "error.main",
                borderColor: "error.main",
              },
            }}
          >
            <Box
              sx={{
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </Box>
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default PlayerStatsBox;
