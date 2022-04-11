import { Box, Stack, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  setOutcomeModal,
  setSequence,
  setActiveNodes,
} from "features/hackTheSystem/hackTheSystemSlice";
import TerminalModalWrapper from "components/Reusable/TerminalModalWrapper";
import { FONTS } from "lib/theme";

const PlayoutcomeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { outcomeModal, sequence } = useAppSelector(
    (state) => state.hackTheSystem.game
  );

  const { success } = outcomeModal;

  const closeOutcomeModal = () => {
    if (outcomeModal.success === false) {
      dispatch(setSequence(1));
      dispatch(setActiveNodes(null));
    }
    dispatch(setOutcomeModal({ active: false, success: false }));
  };
  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper
      open={outcomeModal.active}
      onClose={() => closeOutcomeModal()}
      red={success ? false : true}
      bigTitle={success ? "HACKING SUCCESFUL" : "HACKING UNSUCCESFUL"}
      onMainClick={() => closeOutcomeModal()}
    >
      <Box
        sx={{
          py: 3,
          px: 4,
          fontFamily: FONTS.FURORE,
          textTransform: "uppercase",
          bgcolor: !success ? `rgba(120,0,0,0.15)` : `rgba(0,120,0,0.05)`,
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ color: "common.gray" }}>SEQUENCE {sequence}</Box>
          <Box sx={{ color: "primary.white" }}>
            HACKING {success ? "SUCCESSFUL" : "FAILURE"}
          </Box>
          <Box sx={{ color: "common.gray" }}>
            ==============================================
          </Box>
          {success ? (
            <Box sx={{ color: "primary.main" }}>ACCESS GRANTED</Box>
          ) : (
            <Box sx={{ color: "error.main" }}>
              WRONG PATH ---- DISCONNECTED...
            </Box>
          )}
          <Box sx={{ color: "common.gray" }}>
            ==============================================
          </Box>
        </Stack>
        <Box sx={{ minHeight: "10vh", pt: 3, textAlign: "center" }}>
          {!success && (
            <Button size="large" variant="redSharp" component="span">
              RETRY
            </Button>
          )}
        </Box>
      </Box>
    </TerminalModalWrapper>
  );
};

export default PlayoutcomeModal;
