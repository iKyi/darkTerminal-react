import AuthProviderButtons from "./AuthProviderButtons";
import AuthProviderWalletWrapper from "./AuthProviderWalletWrapper";

export type MintProviderPropsType = {
  children?: any;
};

const MintProvider: React.VFC<MintProviderPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <AuthProviderWalletWrapper>
      <AuthProviderButtons>{children}</AuthProviderButtons>
    </AuthProviderWalletWrapper>
  );
};

export default MintProvider;
