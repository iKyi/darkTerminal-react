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
import ConsoleHeader from "../../assets/sections/homepage/consoleHeader.png";

export type TerminalModalWrapperPropsType = {
  children?: any;
  open: boolean;
  onClose?: any;
  onMainClick?: (props: any) => any;
  bigTitle?: string;
  bigTitleSubElem?: string | ReactNode;
  baseWidth?: number;
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
                  color: "primary.main",
                }}
              >
                Dark Terminal Console
              </Typography>
            }
            sx={{
              background: `url('${ConsoleHeader}')`,
              backgroundSize: "100% 100%",
            }}
          />
          <CardContent
            sx={{
              p: 0,
              flex: 1,
              borderColor: "primary.main",
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
                backgroundColor: `rgba(0,120,0,0.10)`,
              }}
            >
              {bigTitle && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "primary.main",
                    borderBottom: (theme) =>
                      `3px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <GlitchFont sx={{ fontSize: "1.4rem" }}>
                    {bigTitle}
                  </GlitchFont>
                  <Box sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
                    {bigTitleSubElem ? bigTitleSubElem : "_____<"}
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
