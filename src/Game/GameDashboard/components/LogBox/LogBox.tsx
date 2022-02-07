import { Box, Stack } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { FONTS } from "../../../../lib/theme";
import greenStageBg from "./greenStageBg.png";
import { CheckSharp } from "@mui/icons-material";
import { useEffect, useRef } from "react";

export type LogBoxPropsType = {};

const LogBox: React.VFC<LogBoxPropsType> = () => {
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const gameData = useAppSelector((state) => state.game.game);
  const { sequence, log } = gameData;

  useEffect(() => {
    setTimeout(() => {
      if (scrollBoxRef && scrollBoxRef.current) {
        scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
      }
    }, 200);
  }, [sequence, log]);

  // *************** RENDER *************** //
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: `url('${greenStageBg}')`,
            width: "60px",
            height: "47px",
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              fontFamily: FONTS.FURORE,
              color: "primaru.main",
              fontSize: "1.3rem",
            }}
          >
            0{sequence}
          </Box>
        </Box>
        <Stack sx={{ ml: 2 }}>
          <Box sx={{ color: "common.white", fontSize: "0.85rem" }}>
            SEQUENCE {sequence}
          </Box>
          <Box sx={{ color: "primary.main", fontFamily: FONTS.FURORE }}>
            DARK TERMINAL
          </Box>
        </Stack>
      </Box>
      <Box sx={{ pt: 3, pb: 1.5, maxWidth: "220px" }}>
        <Box
          ref={scrollBoxRef}
          sx={{
            maxHeight: "200px",
            overflow: "auto",
            fontFamily: FONTS.FURORE,
            fontSize: "0.85rem",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          <Box sx={{ color: "primary.darker" }}>CONSOLE INITIALIZING...</Box>
          {log.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  color: item.success ? "primary.main" : "error.main",
                  lineHeight: 1,
                  mt: 1.5,
                }}
              >
                <Box sx={{ color: "primary.darker", pb: 0.85 }}>
                  ---------------
                </Box>
                <Box sx={{ pb: 0.85 }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      color: "primary.main",
                      mr: 1,
                    }}
                  >
                    {"-->"} 1 OF {item.items}
                  </Box>
                  <Box sx={{ display: "inline-block", color: "primary.light" }}>
                    ({item.chance.toFixed(2)}% CHANCE)
                  </Box>
                </Box>
                {item.exploit && (
                  <Box sx={{ display: "flex", alignItems: "center", pb: 0.85 }}>
                    {">_"} EXPLOIT USED
                  </Box>
                )}

                {item.success ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CheckSharp sx={{ mr: 1 }} fontSize={`small`} /> ACCESS
                    GRANTED
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    X ACCESS DENIED
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default LogBox;
