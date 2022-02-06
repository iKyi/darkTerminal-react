import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCodeAuthModal } from "../features/game/gameSlice";

export type GameAuthProviderPropsType = {
  children?: any;
};

const GameAuthProvider: React.VFC<GameAuthProviderPropsType> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.game.actor);

  useEffect(() => {
    if (!code) {
      dispatch(setCodeAuthModal(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  // *************** RENDER *************** //
  if (!code) return null;
  return <>{children}</>;
};

export default GameAuthProvider;
