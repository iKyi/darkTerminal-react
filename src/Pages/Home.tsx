import AboutBoxesHome from "src/components/Homepage/AboutBoxesHome";
import { Container } from "@mui/material";
// import HeroBox from "../components/Homepage/HeroBox";
import ReportLine from "../components/Homepage/ReportLine";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Reusable/Layout/Footer/Footer";
import Header from "../components/Reusable/Layout/Header/Header";
import SeoComp from "../components/Reusable/Seo";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";
import { addLoader, removeLoader } from "../features/global/globalSlice";
import HomeXBox from "src/components/Homepage/HomeXBox";
// import HomeThreeNews from "src/components/Homepage/HomeThreeNews";
import OurNftsBox from "src/components/Homepage/OurNftsBox";
import HomeContentTabs from "src/components/Homepage/HomeContentTabs";

export type HomePropsType = {};

const Home: React.VFC<HomePropsType> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    dispatch(addLoader("homeData"));
    axiosGetter(getStrapiURL("home-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
      dispatch(removeLoader("homeData"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const seo = data?.data?.attributes?.seo;
  // const { heroImage, heroVideo } = data || {};
  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <StrapiPublicProvider>
      <Header />
      <SeoComp seo={seo} />
      <Container>
        <HomeXBox />
      </Container>
      {/* <Container>
        <HeroBox heroImage={heroImage} heroVideo={heroVideo} />
      </Container> */}
      <Container>
        <ReportLine />
      </Container>
      <OurNftsBox />
      <AboutBoxesHome />
      <HomeContentTabs />
      {/* <HomeThreeNews /> */}
      <Footer />
    </StrapiPublicProvider>
  );
};

export default Home;
