import { Box } from "@mui/material";
import useMobile from "src/hooks/useMobile";
import GlitchFont from "../Reusable/GlitchFont";

export type BigSectionWrapperPropsType = {
  children?: any;
  title: string;
};

const BigSectionWrapper: React.VFC<BigSectionWrapperPropsType> = ({
  children,
  title,
}) => {
  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box sx={{ marginBottom: !mobile ? "70px" : "25px" }}>
      <Box sx={{ textAlign: "center" }}>
        <GlitchFont>{title}</GlitchFont>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default BigSectionWrapper;
