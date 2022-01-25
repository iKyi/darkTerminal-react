import { SxProps, Typography } from "@mui/material";

export type GlitchFontPropsType = {
  children?: any;
  sx?: SxProps;
};

const GlitchFont: React.VFC<GlitchFontPropsType> = ({ children, sx }) => {
  // *************** RENDER *************** //
  return (
    <Typography
      sx={{
        fontFamily: "CF Glitch City",
        textTransform: "uppercase",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default GlitchFont;
