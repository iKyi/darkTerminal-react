import { Box, CircularProgress, Grid, Alert, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { LOADING_KEY } from "src/constants/loadingKeys";
import { addLoader, removeLoader } from "src/features/global/globalSlice";
import useMobile from "src/hooks/useMobile";
import axiosGetter from "src/lib/axios/axiosGetter";
import { centerFlex } from "src/lib/sxUtils";
import { getStrapiURL } from "src/lib/theme/api";
import ArticleGridItem from "../Newspage/ArticleGridItem";
import BigSectionWrapper from "./BigSectionWrapper";

export type HomeThreeNewsPropsType = {
  children?: any;
};

const title = (
  <Box component="span">
    <Box component="span" sx={{ color: "common.white" }}>
      LATEST
    </Box>{" "}
    <Box component="span" sx={{ color: "primary.main" }}>
      NEWS
    </Box>
  </Box>
);

const HomeThreeNews: React.VFC<HomeThreeNewsPropsType> = ({ children }) => {
  const mobile = useMobile();
  const dispatch = useAppDispatch();
  const [articles, setData] = useState<any>(null);
  const homeNewsLoading = useAppSelector(
    (state) => state.global.loaders
  ).includes(LOADING_KEY.NEWS_HOME_LOADING);

  useEffect(() => {
    dispatch(addLoader(LOADING_KEY.NEWS_HOME_LOADING));
    axiosGetter(getStrapiURL("articles?populate=*")).then((resp) => {
      const procResponse = resp.data.map((item: any) => {
        return { id: item.id, ...item.attributes };
      });
      setData(procResponse.length > 3 ? procResponse.slice(3) : procResponse);
      dispatch(removeLoader(LOADING_KEY.NEWS_HOME_LOADING));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *************** RENDER *************** //
  if (homeNewsLoading) {
    return (
      <Box sx={{ flex: 1, height: "100%", width: "100%", ...centerFlex }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  return (
    <BigSectionWrapper title={title}>
      <Container sx={{ mt: [3, 3, 6] }}>
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
      </Container>
    </BigSectionWrapper>
  );
};

export default HomeThreeNews;
