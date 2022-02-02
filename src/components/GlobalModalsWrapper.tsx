import PlayoutcomeModal from "../Game/GameDashboard/components/PlayOutcomeModal/PlayoutcomeModal";
import ComingSoonModal from "./Reusable/ComingSoonModal";

export type GlobalModalsWrapperPropsType = {
  children?: any;
};

const GlobalModalsWrapper: React.VFC<GlobalModalsWrapperPropsType> = ({
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <>
      <ComingSoonModal />
      <PlayoutcomeModal />
    </>
  );
};

export default GlobalModalsWrapper;
