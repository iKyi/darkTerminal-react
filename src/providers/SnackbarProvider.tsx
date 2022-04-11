import { Box, CardActionArea, Snackbar, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { FONTS } from "lib/theme";
import bigAngleBg from "assets/buttons/bigAngleGreen.png";
import useMobile from "../hooks/useMobile";
import { AnimatePresence, motion } from "framer-motion";
import { closeSnackbar } from "features/global/globalSlice";

export type SnackbarProviderPropsType = {};

const SnackbarProvider: React.VFC<SnackbarProviderPropsType> = () => {
  const dispatch = useAppDispatch();
  const { snackBars } = useAppSelector((state) => state.global);
  const snackbarVisible = snackBars.length > 0;
  const mobile = useMobile();

  // *************** RENDER *************** //
  return (
    <Snackbar
      open={snackbarVisible}
      sx={{ mx: "auto" }}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      TransitionComponent={undefined}
    >
      <Box>
        <AnimatePresence>
          {snackBars.map((entry) => {
            const success = entry.variant === "success";
            return (
              <motion.div
                key={entry.id}
                initial={{
                  translateY: "50%",
                  opacity: 0.5,
                }}
                animate={{
                  translateY: "0%",
                  opacity: 1,
                }}
                exit={{
                  translateY: "50%",
                  opacity: 0.5,
                }}
                transition={{ duration: 1 }}
              >
                <CardActionArea
                  onClick={() => dispatch(closeSnackbar(entry.id))}
                  sx={{
                    background: mobile
                      ? "rgba(0,0,0,0.85)"
                      : `url('${bigAngleBg}')`,
                    backgroundSize: "100% 100%",
                    border: (theme) =>
                      !mobile
                        ? "none"
                        : `2px solid ${theme.palette.primary.main}`,
                    borderRadius: mobile ? 0 : "15px",
                    backgroundPosition: "center center",
                    maxWidth: "100%",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONTS.GLITCH,
                    color: !success ? "error.main" : "primary.main",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1.3,
                    px: mobile ? "none" : 20,
                    minHeight: mobile ? "0px" : "140px",
                    textShadow: "1px 1px 1px black",
                  }}
                >
                  <Stack>
                    <Box>{entry.content}</Box>
                  </Stack>
                </CardActionArea>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Snackbar>
  );
};

export default SnackbarProvider;
