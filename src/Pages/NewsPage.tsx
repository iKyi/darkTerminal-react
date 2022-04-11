import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "components/Reusable/Layout/Footer/Footer";
import Header from "components/Reusable/Layout/Header/Header";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";

export type NewsPagePropsType = {
  children?: any;
};

const NewsPage: React.VFC<NewsPagePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <StrapiPublicProvider>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </StrapiPublicProvider>
  );
};

export default NewsPage;
