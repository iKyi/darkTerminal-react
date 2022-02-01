import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Reusable/Layout/Footer/Footer";
import Header from "../components/Reusable/Layout/Header/Header";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";
import PageHeader from "../components/Reusable/PageHeader";
import SeoComp from "../components/Reusable/Seo";
import useMobile from "../hooks/useMobile";
import ContentParser from "../components/Reusable/ContentParser";

export type HowToBuyPropsType = {
  children?: any;
};

const HowToBuy: React.VFC<HowToBuyPropsType> = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const mobile = useMobile();

  useEffect(() => {
    axiosGetter(getStrapiURL("how-to-buy?populate=*"))
      .then((resp) => {
        setData(resp.data.attributes);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pageHeader, seo, content } = data || {};
  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <StrapiPublicProvider>
      <Header />
      <SeoComp seo={seo} />
      <Container>
        <PageHeader {...pageHeader} />
        <ContentParser sx={{ pt: mobile ? 1 : 3, pb: 3 }}>
          {content}
        </ContentParser>
      </Container>
      <Footer />
    </StrapiPublicProvider>
  );
};

export default HowToBuy;
