import { Box } from "@mui/material";

export type NewsPagePropsType = {
  children?: any;
};

const NewsPage: React.VFC<NewsPagePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return <Box>news page</Box>;
};

export default NewsPage;
