import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCodeAuthModal } from "../features/game/gameSlice";
import GameCodeAuthModal from "../Game/GameCodeAuthModal";

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
  return (
    <>
      {children}
      <GameCodeAuthModal />
    </>
  );
};

export default GameAuthProvider;
