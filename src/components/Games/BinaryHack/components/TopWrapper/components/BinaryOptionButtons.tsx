import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setActiveStakeBinary } from "features/binary/binarySlice";

let options = [0.05, 0.1, 0.25, 0.5, 1];

export type BinaryOptionButtonsPropsType = {};

const BinaryOptionButtons: React.VFC<BinaryOptionButtonsPropsType> = () => {
  const dispatch = useAppDispatch();
  const { activeStake } = useAppSelector((state) => state.binaryHack);

  const setStakeActive = (value: number) => {
    if (activeStake === value) {
      dispatch(setActiveStakeBinary(null));
    } else {
      dispatch(setActiveStakeBinary(value));
    }
  };

  // *************** RENDER *************** //
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      {options.map((item) => {
        const active = activeStake === item;
        return (
          <Button
            variant="outlined"
            color="primary"
            key={item}
            size="large"
            sx={{
              transition: "all .2s",
              m: 1,
              bgcolor: active ? "primary.main" : undefined,
              textShadow: "none",
              ":hover": {
                bgcolor: active ? "error.main" : undefined,
              },
            }}
            onClick={() => setStakeActive(item)}
          >
            <Box
              sx={{
                color: active ? "common.black" : "primary.main",
                transition: "all .2s",
              }}
            >
              {item}{" "}
              <Typography
                component="span"
                sx={{
                  color: active ? "common.black" : "common.white",
                  transition: "all .2s",
                }}
              >
                SOL
              </Typography>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
};

export default BinaryOptionButtons;
