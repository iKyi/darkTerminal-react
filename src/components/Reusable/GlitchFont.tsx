import { Box, SxProps } from "@mui/material";
import { FONTS } from "lib/theme";

export type GlitchFontPropsType = {
  children?: any;
  sx?: SxProps;
};

const GlitchFont: React.VFC<GlitchFontPropsType> = ({ children, sx }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        fontFamily: `${FONTS.GLITCH} !important`,
        textTransform: "uppercase",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlitchFont;
