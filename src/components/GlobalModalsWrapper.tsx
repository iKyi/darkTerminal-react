import DepositModal from "./Games/BinaryHack/components/TransactionModals/DepositModal";
import WithdrawModal from "./Games/BinaryHack/components/TransactionModals/WithdrawModal";
import PlayoutcomeModal from "./Games/HackTheSystem/HackTheSystemProper/components/PlayOutcomeModal/PlayoutcomeModal";
import ComingSoonModal from "./Reusable/ComingSoonModal";
import InfoModal from "./Reusable/InfoModal";

export type GlobalModalsWrapperPropsType = {};

const GlobalModalsWrapper: React.VFC<GlobalModalsWrapperPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <ComingSoonModal />
      <InfoModal />
      <PlayoutcomeModal />
      <DepositModal />
      <WithdrawModal />
    </>
  );
};

export default GlobalModalsWrapper;
