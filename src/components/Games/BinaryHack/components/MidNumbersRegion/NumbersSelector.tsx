import { Box } from "@mui/material";
import NumberButtons from "./NumberButtons";

export type NumbersSelectorPropsType = {
  children?: any;
};

const NumbersSelector: React.VFC<NumbersSelectorPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box>
      <Box
        sx={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NumberButtons />
      </Box>
    </Box>
  );
};

export default NumbersSelector;
