import { createContext, useEffect, useState } from "react";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";

export type StrapiPublicProviderPropsType = {
  children?: any;
};

export const StrapiContext = createContext<Record<any, any>>({});

const StrapiPublicProvider: React.VFC<StrapiPublicProviderPropsType> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("global?populate=*")).then((resp) => {
      setData(resp.data);
    });
  }, []);

  // *************** RENDER *************** //
  if (!data) {
    return null;
  }
  return (
    <StrapiContext.Provider value={data.attributes}>
      {children}
    </StrapiContext.Provider>
  );
};

export default StrapiPublicProvider;
