import { Outlet } from "react-router-dom";
import GameAuthProvider from "../providers/GameAuthProvider";

export type GamePagePropsType = {};

const GamePage: React.VFC<GamePagePropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <GameAuthProvider>
        <Outlet />
      </GameAuthProvider>
    </>
  );
};

export default GamePage;
