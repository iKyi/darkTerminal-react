import GameCodeAuthModal from "../Game/GameCodeAuthModal";
import PlayoutcomeModal from "../Game/GameDashboard/components/PlayOutcomeModal/PlayoutcomeModal";
import ComingSoonModal from "./Reusable/ComingSoonModal";

export type GlobalModalsWrapperPropsType = {};

const GlobalModalsWrapper: React.VFC<GlobalModalsWrapperPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <ComingSoonModal />
      <PlayoutcomeModal />
      <GameCodeAuthModal />
    </>
  );
};

export default GlobalModalsWrapper;
