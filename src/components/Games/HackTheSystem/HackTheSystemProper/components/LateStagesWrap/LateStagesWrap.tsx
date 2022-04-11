import { useAppSelector } from "app/hooks";
import StageEight from "./components/StageEight";
import StageSeven from "./components/StageSeven";

export type LateStagesWrapPropsType = {};

const LateStagesWrap: React.VFC<LateStagesWrapPropsType> = () => {
  const gameData = useAppSelector((state) => state.hackTheSystem.game);
  const { sequence, outcomeModal } = gameData;
  console.log(sequence);
  console.log(outcomeModal);
  // *************** RENDER *************** //
  return (
    <>
      {!outcomeModal.active && sequence === 7 && <StageSeven />}
      {!outcomeModal.active && sequence === 8 && <StageEight />}
    </>
  );
};

export default LateStagesWrap;
