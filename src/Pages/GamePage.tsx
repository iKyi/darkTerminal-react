import { Outlet } from "react-router-dom";

export type GamePagePropsType = {};

const GamePage: React.VFC<GamePagePropsType> = () => {
  // *************** RENDER *************** //
  return (
    <>
      <Outlet />
    </>
  );
};

export default GamePage;
