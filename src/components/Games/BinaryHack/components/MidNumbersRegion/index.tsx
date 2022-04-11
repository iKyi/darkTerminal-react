import { Box, SxProps } from "@mui/material";
import NumbersSelector from "./NumbersSelector";
import greenLeft from "assets/images/binary/numberBars/greenLeft.png";
import greenRight from "assets/images/binary/numberBars/greenRight.png";
import redLeft from "assets/images/binary/numberBars/redLeft.png";
import redRight from "assets/images/binary/numberBars/redRight.png";
import { useAppSelector } from "app/hooks";

export type MidNumbersRegionPropsType = {};

const BoxStyle: SxProps = {
  backgroundSize: "auto 90%",
  backgroundRepeat: "no-repeat",
  flex: 1,
  minHeight: "190px",
};

const MidNumbersRegion: React.VFC<MidNumbersRegionPropsType> = () => {
  const { state } = useAppSelector((state) => state.binaryHack);

  const errorState = state === "error";
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
      }}
    >
      <Box
        sx={{
          background: `url('${errorState ? redLeft : greenLeft}')`,
          ...BoxStyle,
          backgroundPosition: "center right",
        }}
      />
      <NumbersSelector />
      <Box
        sx={{
          background: `url('${errorState ? redRight : greenRight}')`,
          ...BoxStyle,
          backgroundPosition: "center left",
        }}
      />
    </Box>
  );
};

export default MidNumbersRegion;
