import { Box } from "@mui/material";
import { ReactNode } from "react";
import useMobile from "hooks/useMobile";
import GlitchFont from "../Reusable/GlitchFont";

export type BigSectionWrapperPropsType = {
  children?: any;
  title: string | ReactNode;
  fRef?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
};

const BigSectionWrapper: React.VFC<BigSectionWrapperPropsType> = ({
  children,
  title,
  fRef,
}) => {
  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box
      sx={{ marginBottom: !mobile ? "70px" : "25px", mt: [4, 4, 8], px: 2 }}
      ref={fRef}
    >
      <Box sx={{ textAlign: "center", position: "relative", mb: [2, 2, 4] }}>
        <GlitchFont
          sx={{
            fontSize: ["1.6rem", "1.6rem", "2rem"],
            position: "relative",
            zIndex: 2,
          }}
        >
          {title}
        </GlitchFont>
        <Box
          sx={{
            display: ["none", "none", "block"],
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: "-5px",
            opacity: 0.3,
            WebkitTextStroke: "1px",
            WebkitTextStrokeColor: (theme) => theme.palette.primary.main,
            "& span": {
              color: "transparent !important",
            },
          }}
        >
          <GlitchFont
            sx={{
              fontSize: ["2.4rem", "2.4rem", "3.3rem"],
            }}
          >
            {title}
          </GlitchFont>
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default BigSectionWrapper;
