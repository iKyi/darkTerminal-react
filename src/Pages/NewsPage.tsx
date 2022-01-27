import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export type NewsPagePropsType = {
  children?: any;
};

const NewsPage: React.VFC<NewsPagePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default NewsPage;
