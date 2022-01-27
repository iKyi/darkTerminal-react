import { Container, Grid } from "@mui/material";
import PageHeader from "../components/Reusable/PageHeader";
import SamplePic from "../assets/samplePic.png";
import ArticleGridItem from "../components/Newspage/ArticleGridItem";
import useMobile from "../hooks/useMobile";

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

export type NewsPagePropsType = {
  children?: any;
};

const NewsPage: React.VFC<NewsPagePropsType> = ({ children }) => {
  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Container>
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
    </Container>
  );
};

export default NewsPage;
