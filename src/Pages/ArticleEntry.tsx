import { ChevronRight } from "@mui/icons-material";
import { Box, Breadcrumbs, Link as MUILink } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { FONTS } from "../lib/theme";
import { DateTime } from "luxon";
import useMobile from "../hooks/useMobile";
import MarkdownParser from "../components/Reusable/MarkdownParser";
import { useEffect, useState } from "react";
import axiosGetter from "../lib/axios/axiosGetter";
import { getStrapiURL } from "../lib/theme/api";
import { getStrapiMedia } from "../lib/theme/media";

const ArticleEntry: React.VFC = () => {
  const mobile = useMobile();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL(`articles?populate=*&filters[slug][$eq]=${slug}`))
      .then((resp) => {
        setData(resp.data[0].attributes);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const { content, title, image, updatedAt } = data || {};

  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <Box>
      <Breadcrumbs
        separator={<ChevronRight color="primary" />}
        sx={{ my: 4, mb: 3, fontFamily: FONTS.FURORE }}
      >
        <MUILink underline="hover" component={RouterLink} to="/news">
          NEWS
        </MUILink>
        <MUILink
          underline="none"
          component={RouterLink}
          to={`/news/${slug}`}
          aria-current="page"
          color="common.gray"
        >
          {title}
        </MUILink>
      </Breadcrumbs>
      {image && image.data && (
        <Box
          sx={{
            background: `url('${getStrapiMedia(image)}')`,
            backgroundSize: "fit-content",
            backgroundPosition: "center center",
            paddingBottom: "50%",
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            boxShadow: `21px 23px 25px 5px rgba(54, 240, 151, 0.05);`,
            mb: 3,
          }}
        />
      )}
      <Box>
        <Box>
          <i className="lni lni-calendar TP" style={{ fontSize: "0.8rem" }} />
          <Box
            sx={{
              fontFamily: FONTS.FURORE,
              color: "common.gray",
              ml: 1,
              display: "inline-block",
              fontSize: "0.8rem",
            }}
          >
            {DateTime.fromISO(updatedAt).toFormat("dd MMM yyyy")}
          </Box>
        </Box>
        <Box
          sx={{
            mt: 1.5,
            color: "primary.main",
            fontFamily: FONTS.FURORE,
            fontSize: mobile ? "1.35rem" : "1.75rem",
          }}
        >
          {title}
        </Box>
        <Box
          sx={{
            fontFamily: FONTS.SOURCE,
            color: "primary.light",
            mt: 3,
            lineHeight: 1.6,
          }}
        >
          <MarkdownParser>{content}</MarkdownParser>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleEntry;
