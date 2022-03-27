import ComingSoonModal from "./Reusable/ComingSoonModal";
import InfoModal from "./Reusable/InfoModal";

export type GlobalModalsWrapperPropsType = {};

const GlobalModalsWrapper: React.VFC<GlobalModalsWrapperPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <ComingSoonModal />
      <InfoModal />
    </>
  );
};

export default GlobalModalsWrapper;
