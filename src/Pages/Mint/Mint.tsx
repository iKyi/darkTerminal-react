import { Outlet } from "react-router-dom";
import MintingDashboardWrapper from "components/Minting/MintingDashboardWrapper";

export type MintPropsType = {};

const Mint: React.VFC<MintPropsType> = () => {
  // *************** RENDER *************** //

  return (
    <MintingDashboardWrapper>
      <Outlet />
    </MintingDashboardWrapper>
  );
};

export default Mint;
