import { Box, CardActionArea } from "@mui/material";
import MintBoxRedBorder from "../../assets/images/mint/MintBoxRedBorder.png";
import MintBoxWhiteBorder from "../../assets/images/mint/MintBoxWhiteBorder.png";
import { FONTS } from "../../lib/theme";
import redButtonBg from "../../assets/images/mint/redButtonBg.png";
import whiteButtonBg from "../../assets/images/mint/whiteButtonBg.png";

export type MintBoxPropsType = {
  onClick: any;
  disabled: boolean;
  type: string;
  progress: boolean;
};

const MintBox: React.FC<MintBoxPropsType> = ({
  onClick,
  disabled,
  type,
  progress,
}) => {
  // *************** RENDER *************** //
  return (
    <CardActionArea
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: `url('${
          progress ? MintBoxRedBorder : MintBoxWhiteBorder
        }')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        pt: "40px",
      }}
    >
      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            fontFamily: FONTS.FURORE,
            color: "primary.light",
            textTransform: "uppercase",
            fontSize: "1rem",
            mb: 1,
          }}
        >
          {type}
        </Box>
        <Box
          sx={{
            fontFamily: FONTS.FURORE,
            color: progress ? "error.main" : "primary.main",
            fontSize: "1.3rem",
          }}
        >
          {progress ? "IN PROGRESS" : "OPENING SOON"}
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          fontFamily: FONTS.FURORE,
          fontSize: "1.1rem",
          background: `url('${progress ? redButtonBg : whiteButtonBg}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: progress ? "error.main" : "common.gray",
        }}
      >
        MINT NOW
      </Box>
    </CardActionArea>
  );
};

export default MintBox;
