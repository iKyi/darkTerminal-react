import { Box, SxProps } from "@mui/material";

export type GlitchFontPropsType = {
  children?: any;
  sx?: SxProps;
};

const GlitchFont: React.VFC<GlitchFontPropsType> = ({ children, sx }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        fontFamily: "CF Glitch City",
        textTransform: "uppercase",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlitchFont;
