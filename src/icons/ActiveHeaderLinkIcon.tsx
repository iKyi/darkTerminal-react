import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { CSSProperties } from "react";
import activeLinkIcon from "assets/icons/activeHeaderLink.png";

export type ActiveHeaderLinkIconPropsType = {
  style?: CSSProperties;
  sx?: SxProps;
};

const ActiveHeaderLinkIcon: React.VFC<ActiveHeaderLinkIconPropsType> = ({
  style,
  sx,
}) => {
  // *************** RENDER *************** //
  return (
    <Box sx={{ display: "inline-block", ...sx }}>
      <img src={activeLinkIcon} alt="active header link icon" style={style} />
    </Box>
  );
};

export default ActiveHeaderLinkIcon;
