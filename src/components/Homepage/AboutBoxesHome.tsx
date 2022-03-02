import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
import { setComingSoon } from "src/features/global/globalSlice";
import axiosGetter from "src/lib/axios/axiosGetter";
import { FONTS } from "src/lib/theme";
import { getStrapiURL } from "src/lib/theme/api";
import { getStrapiMedia } from "src/lib/theme/media";
import GlitchFont from "../Reusable/GlitchFont";
import MarkdownParser from "../Reusable/MarkdownParser";
import BigSectionWrapper from "./BigSectionWrapper";

const AboutBox: React.VFC<{ index: number; data: Record<any, any> }> = ({
  index,
  data,
}) => {
  const {
    actionButtonText,
    actionButtonUrl,
    content,
    image,
    title,
    titleImage,
  } = data;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const imageElementData = useMemo(() => {
    return image && image.data ? getStrapiMedia(image.data) : false;
  }, [image]);

  const titleImageElementData = useMemo(() => {
    return titleImage && titleImage.data
      ? getStrapiMedia(titleImage.data)
      : false;
  }, [titleImage]);

  const right = index % 2 === 0;

  const actionButton = useMemo(() => {
    return actionButtonText && actionButtonUrl;
  }, [actionButtonText, actionButtonUrl]);
  return (
    <Box
      sx={{
        py: [3, 3, 5],
        "&:first-of-type": {
          pt: 0,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container columnSpacing={[0, 0, 4, 4]}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: right ? 1 : 3,
              padding: 2,
            }}
          >
            {imageElementData && (
              <Box
                sx={{
                  background: `url('${imageElementData}')`,
                  backgroundSize: "100%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "300px",
                  height: "100%",
                }}
              ></Box>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ padding: 2 }}>
              {titleImageElementData && (
                <img
                  src={titleImageElementData}
                  alt="section badge"
                  style={{ marginBottom: "1rem" }}
                />
              )}
              <GlitchFont sx={{ fontSize: "2rem", lineHeight: "1.1" }}>
                <MarkdownParser>{title}</MarkdownParser>
              </GlitchFont>
              <Box
                sx={{
                  marginTop: 2,
                  fontFamily: FONTS.SOURCE,
                  color: "primary.light",
                }}
              >
                <MarkdownParser>{content}</MarkdownParser>
              </Box>
              {actionButton ? (
                <Box sx={{ marginTop: 4 }}>
                  <Button
                    variant="complex"
                    color="secondary"
                    onClick={() =>
                      actionButtonUrl.includes("Soon")
                        ? dispatch(setComingSoon(true))
                        : navigate(actionButtonUrl)
                    }
                  >
                    {actionButtonText}
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export type AboutBoxesHomePropsType = {};

const AboutBoxesHome: React.VFC<AboutBoxesHomePropsType> = () => {
  const [data, setData] = useState<Record<any, any> | null>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("aboutboxes?populate=*")).then((resp) => {
      setData(resp.data);
    });
  }, []);

  const title = (
    <Box component="span">
      <Box component="span" sx={{ color: "common.white" }}>
        OUR
      </Box>{" "}
      <Box component="span" sx={{ color: "primary.main" }}>
        GAMES
      </Box>
    </Box>
  );

  // *************** RENDER *************** //
  return (
    <BigSectionWrapper title={title}>
      {data &&
        data.map((box: any, index: number) => {
          return (
            <AboutBox
              key={box.attributes.title}
              data={box.attributes}
              index={index}
            />
          );
        })}
    </BigSectionWrapper>
  );
};

export default AboutBoxesHome;
