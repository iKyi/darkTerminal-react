import { Box } from "@mui/system";
import { useContext, useMemo } from "react";
import { FONTS } from "../../lib/theme";
import { StrapiContext } from "../../providers/StrapiPublicProvider";
import { CircularProgress, SxProps } from "@mui/material";
import { WalletContext } from "../../providers/AuthProviderButtons";
import { useAppSelector } from "../../app/hooks";

export type SupplyBoxPropsType = {
  sx?: SxProps;
};

const SupplyBox: React.VFC<SupplyBoxPropsType> = ({ sx }) => {
  const { candyMachineReloading } = useAppSelector((state) => state.global);
  const { supplyBox } = useContext(StrapiContext);
  const { max } = supplyBox;

  const { candyMachine } = useContext(WalletContext);

  const itemsRemaining = useMemo(() => {
    return candyMachine?.state.itemsRemaining + 1 ?? 0;
  }, [candyMachine]);

  const boxWidth = useMemo(() => {
    if (itemsRemaining && max) {
      return (itemsRemaining * 100) / max;
    }
    return null;
  }, [itemsRemaining, max]);

  // *************** RENDER *************** //
  return (
    <Box sx={{ position: "relative", ...sx }}>
      {candyMachineReloading && (
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.65)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "primary.light",
          fontFamily: FONTS.FURORE,
          fontSize: "1.1rem",
          mb: 0.7,
        }}
      >
        <Box>TOTAL SUPPLY</Box>
        <Box>
          <Box sx={{ color: "common.white", display: "inline" }}>
            {itemsRemaining}
          </Box>{" "}
          / {max} NFTS
        </Box>
      </Box>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          minWidth: "200px",
          width: "100%",
          display: "flex",
          height: "30px",
          backgroundColor: `rgba(0,120,0,0.25)`,
        }}
      >
        <Box
          sx={{
            background: (theme) =>
              `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${theme.palette.primary.main} 100%)`,
            height: "100%",
            width: `${boxWidth}%`,
          }}
        />
      </Box>
    </Box>
  );
};

export default SupplyBox;
