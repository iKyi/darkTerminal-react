import { Box, CardActionArea, Typography } from "@mui/material";
import { ReactNode } from "react";
import { centerFlex } from "lib/sxUtils";
import { FONTS } from "lib/theme";
import topButtonBG from "assets/images/binary/topButtonBG.png";

export type WalletBoxPropsType = {
  title: string;
  onClick: any;
  buttonText: string;
  icon: ReactNode;
  value: null | number | string;
  currency: string;
};

const WalletBox: React.VFC<WalletBoxPropsType> = ({
  title,
  onClick,
  buttonText,
  icon,
  value,
  currency,
}) => {
  // *************** RENDER *************** //
  return (
    <CardActionArea
      onClick={onClick}
      sx={{
        width: "auto",
        px: 2,
      }}
    >
      <Box sx={{ ...centerFlex }}>
        {icon}
        <Box
          sx={{
            ml: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography component="span">{title}</Typography>
          <Box sx={{ fontSize: "1.2rem" }}>
            <Typography component="span" color="primary">
              {value}
            </Typography>{" "}
            <Typography component="span" sx={{ color: "common.white" }}>
              {currency}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          ...centerFlex,
        }}
      >
        <Box
          sx={{
            mt: 1,
            background: `url('${topButtonBG}')`,
            backgroundSize: "100% 100%",
            textAlign: "center",
            width: "120px",
            py: 1,
            fontFamily: FONTS.FURORE,
            color: "primary.main",
          }}
        >
          {buttonText}
        </Box>
      </Box>
    </CardActionArea>
  );
};

export default WalletBox;
