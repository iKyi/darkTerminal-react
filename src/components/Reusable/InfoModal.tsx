import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setInfoModal } from "src/features/global/globalSlice";
import TerminalModalWrapper from "./TerminalModalWrapper";

export type InfoModalPropsType = {
  children?: any;
};

const InfoModal: React.VFC<InfoModalPropsType> = ({ children }) => {
  const modalInnerData = useAppSelector((state) => state.global.infoModal);
  const dispatch = useAppDispatch();

  const closeInfoModal = () => {
    dispatch(setInfoModal(null));
  };
  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper
      open={modalInnerData ? true : false}
      onClose={closeInfoModal}
      bigTitle="SYSTEM_INFO"
    >
      <Box sx={{ p: 4, textAlign: "center" }}>{modalInnerData}</Box>
    </TerminalModalWrapper>
  );
};

export default InfoModal;
