import { useAppSelector } from "../app/hooks";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import { BlockingTransactionsStates } from "features/global/globalSlice";
import { centerFlex } from "lib/sxUtils";
import MarkdownParser from "./Reusable/MarkdownParser";

export type BlockingSnabarsProviderPropsType = {};

const getIconState = (state: BlockingTransactionsStates) => {
  switch (state) {
    case "loading":
      return <CircularProgress color="error" size="1.3rem" />;
    default:
      return null;
  }
};

const BlockingSnabarsProvider: React.VFC<
  BlockingSnabarsProviderPropsType
> = () => {
  const blockingSnackbars = useAppSelector(
    (state) => state.global.blockingSnackbars
  );

  // *************** RENDER *************** //
  return (
    <Backdrop
      open={blockingSnackbars.length > 0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {blockingSnackbars.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box sx={{ mr: 2, ...centerFlex }}>{getIconState(item.state)}</Box>
            <Box>
              <MarkdownParser>{item.text}</MarkdownParser>
            </Box>
          </Box>
        );
      })}
    </Backdrop>
  );
};

export default BlockingSnabarsProvider;
