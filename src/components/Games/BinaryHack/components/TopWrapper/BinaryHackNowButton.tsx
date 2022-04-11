import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/hooks";
import GlitchFont from "components/Reusable/GlitchFont";
import { binaryPlay } from "features/binary/binaryActions";
import {
  setActiveItem,
  setActiveStakeBinary,
  setBinaryState,
  setSuccessAmount,
} from "features/binary/binarySlice";
import BinaryOptionButtons from "./components/BinaryOptionButtons";
import bigAngleBg from "assets/buttons/bigAngleGreen.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { startSnackbar } from "features/global/globalSlice";

const HackAgainButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const resetState = () => {
    dispatch(setActiveItem(null));
    dispatch(setBinaryState("idle"));
    dispatch(setSuccessAmount(null));
    dispatch(setActiveStakeBinary(null));
  };

  return (
    <Button variant="complex" onClick={resetState}>
      HACK AGAIN
    </Button>
  );
};

export type BinaryHackNowButtonPropsType = {};

const BinaryHackNowButton: React.VFC<BinaryHackNowButtonPropsType> = () => {
  const dispatch = useAppDispatch();
  const { state, activeItem, activeStake, successAmount, hackingInProgress } =
    useAppSelector((state) => state.binaryHack);
  const { publicKey } = useWallet();

  const failState = state === "error";
  const successState = state === "success";

  const doHack = () => {
    if (!publicKey) {
      dispatch(
        startSnackbar({
          content: "No wallet key provided !",
          variant: "error",
          id: "noWalletKey",
        })
      );
    } else {
      dispatch(binaryPlay(publicKey));
    }
  };

  const hackDisabled = activeItem == null || activeStake == null;
  // *************** RENDER *************** //
  if (hackingInProgress) {
    return (
      <Box
        sx={{
          overflow: "hidden",
          background: `url('${bigAngleBg}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          width: "412px",
          maxWidth: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: `hackTextEffect 1s infinite ease`,
          mt: 5,
        }}
      >
        <GlitchFont>HACKING</GlitchFont>
      </Box>
    );
  }
  if (failState) {
    return (
      <Stack spacing={5} sx={{ mt: 3 }} alignItems="center">
        <GlitchFont sx={{ textAlign: "center", fontSize: "1.6rem" }}>
          HACKING{" "}
          <Typography
            color="error"
            component="span"
            sx={{ fontFamily: "inherit", fontSize: "inherit" }}
          >
            FAILED
          </Typography>
        </GlitchFont>
        <HackAgainButton />
      </Stack>
    );
  }
  if (successState) {
    return (
      <Stack spacing={2} sx={{ mt: 3 }} alignItems="center">
        <GlitchFont sx={{ textAlign: "center", fontSize: "1.6rem" }}>
          HACKING{" "}
          <Typography
            color="primary"
            component="span"
            sx={{ fontFamily: "inherit", fontSize: "inherit" }}
          >
            SUCCESSFUL
          </Typography>
        </GlitchFont>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography>YOU'VE HACKED</Typography>
          <Typography color="primary">{successAmount} SOL</Typography>
        </Box>
        <HackAgainButton />
      </Stack>
    );
  }
  return (
    <Stack spacing={5} sx={{ mt: 3 }} alignItems="center">
      <BinaryOptionButtons />
      <Button variant="complex" onClick={doHack} disabled={hackDisabled}>
        HACK NOW
      </Button>
    </Stack>
  );
};

export default BinaryHackNowButton;
