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
    </>
  );
};

export default GlobalModalsWrapper;
