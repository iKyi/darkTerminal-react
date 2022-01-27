import { Box, Grid } from "@mui/material";
import useMobile from "../../hooks/useMobile";
import PageHeader from "../Reusable/PageHeader";
import ArticleGridItem from "./ArticleGridItem";
import SamplePic from "../../assets/samplePic.jpg";

const mockArticles = [
  {
    title: "Lorem, ipsum dolor.",
    lastUpdated: new Date().toISOString(),
    slug: "sample-article",
    image: SamplePic,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, voluptate.",
  },
  {
    title: "Lorem, ipsum.",
    lastUpdated: new Date().toISOString(),
    slug: "sample-article",
    image: SamplePic,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, voluptate.",
  },
  {
    title: "Lorem, ipsum dolor ipsum",
    lastUpdated: new Date().toISOString(),
    slug: "sample-article",
    image: SamplePic,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, voluptate.",
  },
  {
    title: "Lorem, ipsum dolor ipsum ipsum",
    lastUpdated: new Date().toISOString(),
    slug: "sample-article",
    image: SamplePic,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, voluptate.",
  },
];

export type NewsIndexPropsType = {
  children?: any;
};

const NewsIndex: React.VFC<NewsIndexPropsType> = ({ children }) => {
  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box>
      <PageHeader title="LATEST NEWS" subtitle="OUR" />
      <Grid container spacing={mobile ? 3 : 5}>
        {mockArticles &&
          mockArticles.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <ArticleGridItem {...item} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default NewsIndex;
