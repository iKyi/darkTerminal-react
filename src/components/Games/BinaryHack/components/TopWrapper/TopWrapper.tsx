import { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";
import { useAppSelector } from "app/hooks";
import topLeftGreen from "assets/images/binary/topWrapper/topLeftGreen.png";
import topRightGreen from "assets/images/binary/topWrapper/topRightGreen.png";
import topLeftRed from "assets/images/binary/topWrapper/topLeftRed.png";
import topRightRed from "assets/images/binary/topWrapper/topRightRed.png";
import bottomLeftGreen from "assets/images/binary/topWrapper/bottomLeftGreen.png";
import bottomRightGreen from "assets/images/binary/topWrapper/bottomRightGreen.png";
import bottomLeftRed from "assets/images/binary/topWrapper/bottomLeftRed.png";
import bottomRightRed from "assets/images/binary/topWrapper/bottomRightRed.png";
import glitchBackgroundGif from "assets/images/glitchBackgroundGif.gif";
import useMobile from "hooks/useMobile";

const BoxGenral: SxProps = {
  width: "1440px",
  maxWidth: "100%",
  m: "0 auto",
  display: "flex",
};

export type TopWrapperPropsType = {
  children?: any;
  sx?: SxProps;
  topContent?: ReactNode | string;
  bottomContent?: ReactNode | string;
};

const TopWrapper: React.VFC<TopWrapperPropsType> = ({
  children,
  sx,
  topContent,
  bottomContent,
}) => {
  const { state, hackingInProgress } = useAppSelector(
    (state) => state.binaryHack
  );
  const isMobile = useMobile();
  const failState = state === "error";
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 3.5,
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        position: "relative",
        ...sx,
      }}
    >
      {hackingInProgress && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            background: `url('${glitchBackgroundGif}')`,
            backgroundSize: "100% 100%",
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: 0.15,
          }}
        />
      )}
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <Box
          sx={{
            ...BoxGenral,
          }}
        >
          <img
            style={{
              display: isMobile ? "none" : "block",
              width: "auto",
              height: "auto",
            }}
            src={failState ? topLeftRed : topLeftGreen}
            alt="topLeft"
          />
          <Box sx={{ flex: 1, px: 2 }}>{topContent}</Box>
          <img
            style={{
              display: isMobile ? "none" : "block",
              width: "auto",
              height: "auto",
            }}
            src={failState ? topRightRed : topRightGreen}
            alt="topRight"
          />
        </Box>
        {children}
        <Box
          sx={{
            ...BoxGenral,
          }}
        >
          <img
            style={{
              display: isMobile ? "none" : "block",
              width: "auto",
              height: "auto",
            }}
            src={failState ? bottomLeftRed : bottomLeftGreen}
            alt="topLeft"
          />
          <Box
            sx={{
              flex: 1,
              px: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {bottomContent}
          </Box>
          <img
            style={{
              display: isMobile ? "none" : "block",
              width: "auto",
              height: "auto",
            }}
            src={failState ? bottomRightRed : bottomRightGreen}
            alt="topRight"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopWrapper;
