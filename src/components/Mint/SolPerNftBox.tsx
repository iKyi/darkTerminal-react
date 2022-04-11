import { Box, SxProps } from "@mui/material";
import { useContext } from "react";
import { FONTS } from "lib/theme";
import { StrapiContext } from "../../providers/StrapiPublicProvider";
import SolIcon from "../Icons/SolIcon";

export type SolPerNftBoxPropsType = {
  sx?: SxProps;
};

const SolPerNftBox: React.VFC<SolPerNftBoxPropsType> = ({ sx }) => {
  const { solPerNft } = useContext(StrapiContext);
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: FONTS.FURORE,
        fontSize: "1.2rem",
        py: 4,
        ...sx,
      }}
    >
      <Box sx={{ color: "primary.light" }}>MINT PRICE FOR 1 NFT</Box>
      <Box
        sx={{
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SolIcon sx={{ height: "18px", mr: 1 }} /> {solPerNft} SOL
      </Box>
    </Box>
  );
};

export default SolPerNftBox;
