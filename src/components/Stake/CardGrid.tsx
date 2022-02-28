import { Grid, Box, CircularProgress } from "@mui/material";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";
import CardEntry from "./CardEntry";
import { useAppSelector } from "../../app/hooks";
import { LOADING_KEY } from "src/constants/loadingKeys";
import { centerFlex } from "../../lib/sxUtils";

export type CardGridPropsType = {
  tokens: ITokenCustomEntry[];
};

const CardGrid: React.VFC<CardGridPropsType> = ({ tokens }) => {
  const charsLoading = useAppSelector((state) => state.global.loaders).includes(
    LOADING_KEY.CHARS_LOADING
  );
  // *************** RENDER *************** //
  if (charsLoading) {
    return (
      <Box sx={{ flex: 1, height: "100%", width: "100%", ...centerFlex }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  return (
    <Grid container columnSpacing={[1]} rowSpacing={2}>
      {tokens.map((token) => {
        return (
          <Grid item key={token.mint} xs={6} md={4} xl={3}>
            <CardEntry data={token} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardGrid;
