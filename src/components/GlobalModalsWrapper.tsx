import PlayoutcomeModal from "../Game/GameDashboard/components/PlayOutcomeModal/PlayoutcomeModal";
import ComingSoonModal from "./Reusable/ComingSoonModal";
import InfoModal from "./Reusable/InfoModal";

export type GlobalModalsWrapperPropsType = {};

const GlobalModalsWrapper: React.VFC<GlobalModalsWrapperPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <ComingSoonModal />
      <PlayoutcomeModal />
      <InfoModal />
    </>
  );
};

export default GlobalModalsWrapper;
