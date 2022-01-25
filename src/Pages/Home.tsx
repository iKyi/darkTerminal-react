import { Container } from "@mui/material";
import HeroBox from "../components/Homepage/HeroBox";
import ReportLine from "../components/Homepage/ReportLine";

export type HomePropsType = {
  children?: any;
};

const Home: React.VFC<HomePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <>
      <Container>
        <HeroBox />
      </Container>
      <ReportLine />
    </>
  );
};

export default Home;
