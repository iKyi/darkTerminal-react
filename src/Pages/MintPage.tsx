import { useEffect, useState } from "react";
import MintPageContent from "../components/Mint/MintPageContent";
import SeoComp from "../components/Reusable/Seo";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";
import AuthProviderButtons from "../providers/AuthProviderButtons";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";

export type MintPagePropsType = {};

const MintPage: React.VFC<MintPagePropsType> = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    axiosGetter(getStrapiURL("mint-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
    });
  }, []);

  const { seo, pageHeader, pageDesc } = data || {};

  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <StrapiPublicProvider>
      <SeoComp seo={seo} />
      <AuthProviderButtons>
        <MintPageContent pageHeader={pageHeader} pageDesc={pageDesc} />
      </AuthProviderButtons>
    </StrapiPublicProvider>
  );
};

export default MintPage;
