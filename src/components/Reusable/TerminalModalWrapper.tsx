import { ReactNode } from "react";
import {
  Card,
  CardHeader,
  Modal,
  Typography,
  Box,
  CardContent,
  CardActionArea,
} from "@mui/material";
import GlitchFont from "./GlitchFont";
import redModalheader from "../../assets/sections/modal/redModalHeader.png";
import greenModalheader from "../../assets/sections/modal/greenModalHeader.png";
import { FONTS } from "../../lib/theme";

export type TerminalModalWrapperPropsType = {
  children?: any;
  open: boolean;
  onClose?: any;
  onMainClick?: (props: any) => any;
  bigTitle?: string | ReactNode;
  bigTitleSubElem?: string | ReactNode;
  baseWidth?: number;
  red?: boolean;
};

const ActionWrapper: React.FC<{
  onClick?: (props?: any) => any;
  children: any;
}> = ({ onClick, children }) => {
  if (onClick) {
    return (
      <CardActionArea onClick={() => onClick()}>{children}</CardActionArea>
    );
  }
  return children;
};

const TerminalModalWrapper: React.VFC<TerminalModalWrapperPropsType> = ({
  children,
  open,
  onClose,
  onMainClick,
  bigTitle,
  bigTitleSubElem,
  baseWidth,
  red,
}) => {
  // *************** RENDER *************** //
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: baseWidth ? baseWidth : "500px",
          maxWidth: "calc(100% - 10px)",
          borderRadius: 0,
          background: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ActionWrapper onClick={onMainClick}>
          <CardHeader
            title={
              <Typography
                sx={{
                  px: 2,
                  fontFamily: "Furore",
                  fontSize: "0.8rem",
                  color: red ? "error.main" : "primary.main",
                }}
              >
                {">_"} Dark Terminal Console
              </Typography>
            }
            sx={{
              background: `url('${red ? redModalheader : greenModalheader}')`,
              backgroundSize: "100% 100%",
            }}
          />
          <CardContent
            sx={{
              p: 0,
              flex: 1,
              borderColor: !red ? "primary.main" : "error.main",
              borderWidth: 1,
              borderStyle: "solid",
              borderTop: "none",
              backgroundColor: `primary.dark`,
              "&:last-of-type:not(:first-of-type)": {
                pb: 0,
              },
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2,
                backgroundColor: red
                  ? `rgba(120,0,0,0.20)`
                  : `rgba(0,120,0,0.10)`,
              }}
            >
              {bigTitle && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: !red ? "primary.main" : "error.main",
                    borderBottom: (theme) =>
                      `3px solid ${
                        red
                          ? theme.palette.error.main
                          : theme.palette.primary.main
                      }`,
                  }}
                >
                  <GlitchFont sx={{ fontSize: "1.4rem", flex: 1 }}>
                    {bigTitle}
                  </GlitchFont>
                  <Box sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
                    {bigTitleSubElem ? (
                      bigTitleSubElem
                    ) : (
                      <Box
                        sx={{
                          color: "error.main",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          fontFamily: FONTS.FURORE,
                        }}
                      >
                        @ROOT
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
            {children}
          </CardContent>
        </ActionWrapper>
      </Card>
    </Modal>
  );
};

export default TerminalModalWrapper;
