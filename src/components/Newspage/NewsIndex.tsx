import { Alert, Box, Grid } from "@mui/material";
import useMobile from "../../hooks/useMobile";
import PageHeader from "../Reusable/PageHeader";
import ArticleGridItem from "./ArticleGridItem";
import { useEffect, useState } from "react";
import axiosGetter from "../../lib/axios/axiosGetter";
import { getStrapiURL } from "../../lib/theme/api";

export type NewsIndexPropsType = {
  children?: any;
};

const NewsIndex: React.VFC<NewsIndexPropsType> = ({ children }) => {
  const [articles, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("articles?populate=*")).then((resp) => {
      const procResponse = resp.data.map((item: any) => {
        return { id: item.id, ...item.attributes };
      });
      setData(procResponse);
    });
  }, []);

  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box>
      <PageHeader title="LATEST NEWS" subtitle="OUR" />
      <Grid container spacing={mobile ? 3 : 5}>
        {articles && articles.length > 0 ? (
          articles.map((item: any) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <ArticleGridItem {...item} />
              </Grid>
            );
          })
        ) : (
          <Alert title="No articles found" />
        )}
      </Grid>
    </Box>
  );
};

export default NewsIndex;
