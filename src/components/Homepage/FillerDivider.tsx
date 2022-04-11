import { Box, SxProps } from "@mui/material";
import fillerDivider from "assets/images/fillerDivider.png";

export type FillerDividerPropsType = {
  sx?: SxProps;
};

const FillerDivider: React.VFC<FillerDividerPropsType> = ({ sx }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        textAlign: "center",
        ...sx,
      }}
    >
      <img
        src={fillerDivider}
        alt="filler divider section img"
        style={{ display: "inline-block", width: "100%", maxWidth: "1024px" }}
      />
    </Box>
  );
};

export default FillerDivider;
