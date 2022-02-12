import { Box, CardActionArea, Snackbar, Stack } from "@mui/material";
import { useEffect } from "react";
import { setTimeout } from "timers-browserify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GENERAL_SETTINGS } from "../constants/generalSettings";
import { delayedSnackbarClose } from "../features/global/globalSlice";
import { FONTS } from "../lib/theme";
import Slide from "@mui/material/Slide";
import bigAngleBg from "../assets/buttons/bigAngleGreen.png";
import useMobile from "../hooks/useMobile";

export type SnackbarProviderPropsType = {};

const SnackbarProvider: React.VFC<SnackbarProviderPropsType> = () => {
  const dispatch = useAppDispatch();
  const snackBarData = useAppSelector((state) => state.global.snackBar);
  const snackbarVisible = useAppSelector(
    (state) => state.global.snackbarVisible
  );
  const mobile = useMobile();

  const { content, variant } = snackBarData || {};
  const success = variant === "success";

  useEffect(() => {
    if (snackBarData) {
      setTimeout(() => {
        dispatch(delayedSnackbarClose());
      }, GENERAL_SETTINGS.SNACKBAR_TIMEOUT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackBarData]);

  // *************** RENDER *************** //
  return (
    <Snackbar
      open={snackbarVisible}
      sx={{ mx: "auto" }}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      TransitionComponent={Slide}
    >
      <CardActionArea
        onClick={() => dispatch(delayedSnackbarClose())}
        sx={{
          background: mobile ? "rgba(0,0,0,0.85)" : `url('${bigAngleBg}')`,
          backgroundSize: "100% 100%",
          border: (theme) =>
            !mobile ? "none" : `2px solid ${theme.palette.primary.main}`,
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
          <Box>{content}</Box>
        </Stack>
      </CardActionArea>
    </Snackbar>
  );
};

export default SnackbarProvider;
