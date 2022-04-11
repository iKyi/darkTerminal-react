import { Box } from "@mui/material";
import { useAppSelector } from "app/hooks";

export type TitleElementPropsType = {
  children?: any;
};

const TitleElement: React.VFC<TitleElementPropsType> = ({ children }) => {
  const { state } = useAppSelector((state) => state.binaryHack);
  const failState = state === "error";
  // *************** RENDER *************** //
  return (
    <Box sx={{ mt: -1, color: failState ? "error.main" : "primary.main" }}>
      Binary Hack
    </Box>
  );
};

export default TitleElement;
