import {
  IRecentPlayEntry,
  setPlayerRecentPlays,
} from "features/binary/binarySlice";
import { DateTime } from "luxon";
import { Box, Stack, Typography } from "@mui/material";
import logoCircle from "assets/logoCircle.png";
import { centerFlex } from "lib/sxUtils";
import { useEffect, useState } from "react";
import axiosGetter from "lib/axios/axiosGetter";
import getApiBase from "lib/axios/getApiBase";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { FONTS } from "lib/theme";

export type EventsBoxPropsType = {};

const EventsBox: React.VFC<EventsBoxPropsType> = () => {
  const dispatch = useAppDispatch();
  const playerCurrentPlays = useAppSelector(
    (state) => state.binaryHack.playerRecentPlays
  );
  const { publicKey } = useWallet();
  const [generalPlays, setGeneralPlays] = useState<IRecentPlayEntry[]>([]);

  useEffect(() => {
    if (!publicKey) {
      axiosGetter(`${getApiBase()}${REST_ENDPOINTS.RECENT_PLAYS_GENERAL}`).then(
        (resp) => {
          setGeneralPlays(resp);
        }
      );
    } else {
      axiosGetter(
        `${getApiBase()}${REST_ENDPOINTS.RECENT_PLAYS_GENERAL}${publicKey}`
      ).then((resp) => {
        dispatch(setPlayerRecentPlays(resp));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const shownEntries = playerCurrentPlays.length
    ? playerCurrentPlays
    : generalPlays;

  const boxTitle =
    publicKey || playerCurrentPlays.length
      ? "Your recent plays"
      : "recent plays";
  // *************** RENDER *************** //
  if (!shownEntries || shownEntries.length === 0) {
    return null;
  }
  return (
    <Box
      sx={{
        width: 800,
        mx: "auto",
        mt: 3,
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        color="primary.main"
        sx={{ textAlign: "center", mb: 3 }}
      >
        {boxTitle}
      </Typography>
      <Stack>
        {shownEntries.map((item, index) => {
          return (
            <Box
              key={index}
              sx={(theme) => ({
                border: `1px solid ${(theme as any).palette.common.gray}`,
                p: 2,
                "&:not(:first-of-type)": {
                  borderTop: 0,
                },
                display: "flex",
                alignItems: "center",
              })}
            >
              <Box sx={{ mr: 2, ...centerFlex }}>
                <img src={logoCircle} alt="logo circle" />
              </Box>
              <Box
                sx={{
                  color: "common.white",
                  fontFamily: FONTS.SOURCE,
                }}
              >
                Wallet {item.text}{" "}
                <Typography
                  component="span"
                  color={item.win ? "primary.main" : "#fff"}
                  sx={{
                    fontFamily: FONTS.SOURCE,
                    fontWeight: item.win ? "bold" : "normal",
                  }}
                >
                  {item.result}
                </Typography>
                .
              </Box>
              <Box
                sx={{ ml: "auto", fontSize: "0.85rem", color: "common.gray" }}
              >
                {DateTime.fromISO(item.timestamp, { zone: "utc" }).toRelative({
                  base: DateTime.now(),
                })}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default EventsBox;
