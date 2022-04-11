import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import HackTheSystemAuthModal from "./HackTheSystemAuthModal";
import { setCodeAuthModal } from "features/hackTheSystem/hackTheSystemSlice";

export type HackSystemAuthProviderProviderPropsType = {
  children?: any;
};

const HackSystemAuthProviderProvider: React.VFC<
  HackSystemAuthProviderProviderPropsType
> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.hackTheSystem.actor);

  useEffect(() => {
    if (!code) {
      dispatch(setCodeAuthModal(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  // *************** RENDER *************** //
  return (
    <>
      {children}
      <HackTheSystemAuthModal />
    </>
  );
};

export default HackSystemAuthProviderProvider;
