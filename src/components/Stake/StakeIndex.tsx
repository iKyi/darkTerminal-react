import { useAppSelector } from "src/app/hooks";
import CardGrid from "./CardGrid";

export type StakeIndexPropsType = {
  children?: any;
};

const StakeIndex: React.VFC<StakeIndexPropsType> = ({ children }) => {
  const { tokens } = useAppSelector((state) => state.user);
  // *************** RENDER *************** //
  return <CardGrid tokens={tokens} />;
};

export default StakeIndex;
