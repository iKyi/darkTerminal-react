import { Box, SxProps } from "@mui/material";
import solIcon from "assets/icons/solIcon.png";

export type SolIconPropsType = {
  sx?: SxProps;
};

const SolIcon: React.VFC<SolIconPropsType> = ({ sx }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHight: 1,
        ...sx,
      }}
    >
      <img
        src={solIcon}
        alt="Sol Icon"
        width={25}
        height={22}
        style={{ maxWidth: "100%", maxHeight: "100%", width: "auto" }}
      />
    </Box>
  );
};

export default SolIcon;
