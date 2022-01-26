import { Container } from "@mui/material";
import ConsoleWrapper from "../components/Homepage/ConsoleWrapper/ConsoleWrapper";
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
      <ConsoleWrapper />
    </>
  );
};

export default Home;
