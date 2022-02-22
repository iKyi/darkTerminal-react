import { Grid } from "@mui/material";
import { ITokenCustomEntry } from "src/providers/Solana/services/darkTerminal";
import CardEntry from "./CardEntry";

export type CardGridPropsType = {
  tokens: ITokenCustomEntry[];
};

const CardGrid: React.VFC<CardGridPropsType> = ({ tokens }) => {
  // *************** RENDER *************** //
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
