import { CardActionArea, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { DateTime } from "luxon";
import { Link as RouterLink } from "react-router-dom";
import { FONTS } from "../../lib/theme";
import { getStrapiMedia } from "../../lib/theme/media";
import SamplePic from "../../assets/samplePic.jpg";

export type ArticleGridItemPropsType = {
  title: string;
  description?: string;
  image?: any;
  updatedAt: string;
  slug: string;
};

const ArticleGridItem: React.VFC<ArticleGridItemPropsType> = ({
  title,
  description,
  image,
  updatedAt,
  slug,
}) => {
  // *************** RENDER *************** //
  return (
    <Box>
      <CardActionArea
        component={RouterLink}
        to={`/news/${slug}`}
        sx={{
          overflow: "visible",
          pb: 2.5,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <CardMedia
          src={image && image.data ? getStrapiMedia(image) : SamplePic}
          component="img"
          height="194"
          alt={`Image for article: ${title}`}
          sx={{
            border: "1px solid #194F35",
            boxShadow: "21px 23px 25px 5px rgba(54, 240, 151, 0.05)",
          }}
        />

        <Box sx={{ mt: 2.5, px: 1 }}>
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
              fontSize: "1.15rem",
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              mt: 1,
              color: "primary.light",
              fontFamily: FONTS.SOURCE,
              fontSize: "0.9rem",
            }}
          >
            {description}
          </Box>
        </Box>
      </CardActionArea>
    </Box>
  );
};

export default ArticleGridItem;
