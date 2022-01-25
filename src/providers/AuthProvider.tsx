export type AuthProviderPropsType = {
  children?: any;
};

const AuthProvider: React.VFC<AuthProviderPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return <>{children}</>;
};

export default AuthProvider;
