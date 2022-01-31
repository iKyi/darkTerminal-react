import {
  Card,
  CardHeader,
  Modal,
  Typography,
  Box,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setComingSoon } from "../../features/global/globalSlice";
import ConsoleHeader from "../../assets/sections/homepage/consoleHeader.png";
import GlitchFont from "./GlitchFont";

export type ComingSoonModalPropsType = {
  children?: any;
};

const ComingSoonModal: React.VFC<ComingSoonModalPropsType> = ({ children }) => {
  const dispatch = useAppDispatch();
  const comingSoonOpen = useAppSelector((state) => state.global.showComingSoon);
  // *************** RENDER *************** //
  return (
    <Modal
      open={comingSoonOpen}
      onClose={() => dispatch(setComingSoon(false))}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "500px",
          maxWidth: "calc(100% - 10px)",
          borderRadius: 0,
          background: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea onClick={() => dispatch(setComingSoon(false))}>
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
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2,
                backgroundColor: `rgba(0,120,0,0.10)`,
              }}
            >
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
                <GlitchFont sx={{ fontSize: "1.4rem" }}>COMING SOON</GlitchFont>
                <Typography sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
                  {"_____<"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Modal>
  );
};

export default ComingSoonModal;
