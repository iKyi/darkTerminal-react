import { Box } from "@mui/material";
import { ReactNode } from "react";

export type MintingInnerPageWrapperPropsType = {
  children: any;
  topElement?: ReactNode;
};

const MintingInnerPageWrapper: React.VFC<MintingInnerPageWrapperPropsType> = ({
  children,
  topElement,
}) => {
  // *************** RENDER *************** //
  return (
    <Box>
      {topElement && <Box sx={{ mb: [3, 3, 4] }}>{topElement}</Box>}
      {children}
    </Box>
  );
};

export default MintingInnerPageWrapper;
