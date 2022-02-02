import {
  Card,
  CardHeader,
  Modal,
  Typography,
  CardContent,
  Box,
  CardActionArea,
} from "@mui/material";
import GlitchFont from "../../../../components/Reusable/GlitchFont";
import modalheader from "../../../../assets/sections/homepage/consoleHeader.png";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setOutcomeModal } from "../../../../features/game/gameSlice";

const PlayoutcomeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const outcomeModal = useAppSelector((state) => state.game.game.outcomeModal);

  const closeOutcomeModal = () => {
    dispatch(setOutcomeModal({ active: false, success: false }));
  };
  // *************** RENDER *************** //
  return (
    <Modal
      open={outcomeModal.active}
      onClose={() => closeOutcomeModal()}
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
        <CardActionArea onClick={() => closeOutcomeModal()}>
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
              background: `url('${modalheader}')`,
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
                backgroundColor: outcomeModal.success
                  ? `rgba(0,120,0,0.10)`
                  : `rgba(120,0,0,0.10)`,
              }}
            >
              {outcomeModal.success ? (
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
                    HACK SUCCESFUl
                  </GlitchFont>
                  <Typography sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
                    {"_____<"}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "error.main",
                    borderBottom: (theme) =>
                      `3px solid ${theme.palette.error.main}`,
                  }}
                >
                  <GlitchFont sx={{ fontSize: "1.4rem" }}>
                    HACKING UNSUCCESSFUL
                  </GlitchFont>
                  <Typography sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
                    {"_____<"}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Modal>
  );
};

export default PlayoutcomeModal;
