import { Provider } from "react-redux";
import { store } from "../app/store";

export type StoreProviderPropsType = {
  children?: any;
};

const StoreProvider: React.VFC<StoreProviderPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
