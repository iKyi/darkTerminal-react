import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ConsoleWrapper from "../components/Homepage/ConsoleWrapper/ConsoleWrapper";
import HeroBox from "../components/Homepage/HeroBox";
import ReportLine from "../components/Homepage/ReportLine";
import SeoComp from "../components/Reusable/Seo";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";

export type HomePropsType = {
  children?: any;
};

const Home: React.VFC<HomePropsType> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("home-page?populate=*")).then((resp) => {
      setData(resp);
    });
  }, []);
  const seo = data?.data?.attributes?.seo;
  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <>
      <SeoComp seo={seo} />
      <Container>
        <HeroBox />
      </Container>
      <ReportLine />
      <ConsoleWrapper />
    </>
  );
};

export default Home;
