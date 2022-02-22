// import { Container } from "@mui/material";
// import HeroBox from "../components/Homepage/HeroBox";
// import ReportLine from "../components/Homepage/ReportLine";
import { useEffect, useState } from "react";
import ConsoleWrapper from "../components/Homepage/ConsoleWrapper/ConsoleWrapper";
import Footer from "../components/Reusable/Layout/Footer/Footer";
import Header from "../components/Reusable/Layout/Header/Header";
import SeoComp from "../components/Reusable/Seo";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";

export type HomePropsType = {
  children?: any;
};

const Home: React.VFC<HomePropsType> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("home-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
    });
  }, []);
  const seo = data?.data?.attributes?.seo;
  // const { heroImage, heroVideo } = data || {};
  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <StrapiPublicProvider>
      <Header />
      <SeoComp seo={seo} />
      {/* <Container>
        <HeroBox heroImage={heroImage} heroVideo={heroVideo} />
      </Container>
      <ReportLine /> */}
      <ConsoleWrapper />
      <Footer />
    </StrapiPublicProvider>
  );
};

export default Home;
