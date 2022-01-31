import { createContext, useEffect } from "react";
import useSWR from "swr";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";

export type StrapiGlobalProviderPropsType = {
  children?: any;
};

export const StrapiContext = createContext<Record<any, any>>({});

const StrapiGlobalProvider: React.VFC<StrapiGlobalProviderPropsType> = ({
  children,
}) => {
  const { data: fetchedGlobal, error } = useSWR(
    getStrapiURL("global?populate=*"),
    axiosGetter
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  // *************** RENDER *************** //
  if (!fetchedGlobal) {
    return null;
  }
  return (
    <StrapiContext.Provider value={fetchedGlobal?.data?.attributes}>
      {children}
    </StrapiContext.Provider>
  );
};

export default StrapiGlobalProvider;
