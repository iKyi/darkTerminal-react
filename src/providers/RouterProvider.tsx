import { BrowserRouter } from "react-router-dom";

export type RouterProviderPropsType = {
  children?: any;
};

const RouterProvider: React.VFC<RouterProviderPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
