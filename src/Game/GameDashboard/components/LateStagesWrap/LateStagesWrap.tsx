import { useAppSelector } from "../../../../app/hooks";
import StageEight from "./components/StageEight";
import StageSeven from "./components/StageSeven";

export type LateStagesWrapPropsType = {};

const LateStagesWrap: React.VFC<LateStagesWrapPropsType> = () => {
  const gameData = useAppSelector((state) => state.game.game);
  const { sequence } = gameData;
  // *************** RENDER *************** //
  return (
    <>
      {sequence === 7 && <StageSeven />}
      {sequence === 8 && <StageEight />}
    </>
  );
};

export default LateStagesWrap;