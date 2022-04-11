import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ActiveItemType, setActiveItem } from "features/binary/binarySlice";
import successButtonBg from "assets/images/binary/numberButton/success.png";
import successButtonFill from "assets/images/binary/numberButton/successFill.png";
import errorFill from "assets/images/binary/numberButton/errorFill.png";

const options = [0, 1];

const MidNumbersRegion: React.VFC = () => {
  const { activeItem, state, hackingInProgress } = useAppSelector(
    (state) => state.binaryHack
  );
  const dispatch = useAppDispatch();

  const failState = state === "error";
  // *************** RENDER *************** //
  return (
    <Stack sx={{ mx: 4.5 }}>
      {options.map((option) => {
        const activeNumber = activeItem === option;
        if ((state === "success" || state === "error") && !activeNumber) {
          return null;
        }
        return (
          <Button
            key={option}
            onClick={() => dispatch(setActiveItem(option as ActiveItemType))}
            size="large"
            disabled={
              state === "disabled" ||
              state === "success" ||
              state === "error" ||
              hackingInProgress
            }
            sx={{
              color: (theme) =>
                `${
                  activeNumber
                    ? theme.palette.common.black
                    : theme.palette.primary.main
                } !important`,
              fontSize: "3rem",
              py: 1.5,
              px: 3,
              background: `url('${
                failState && activeNumber
                  ? errorFill
                  : activeNumber
                  ? successButtonFill
                  : successButtonBg
              }') !important`,
              minWidth: "85px",
              backgroundSize: "100% 100% !important",
              "&:not(:first-of-type)": {
                mt: 2,
              },
            }}
          >
            {option}
          </Button>
        );
      })}
    </Stack>
  );
};

export default MidNumbersRegion;
