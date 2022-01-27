import { ChevronRight } from "@mui/icons-material";
import { Box, Breadcrumbs, Link as MUILink } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { FONTS } from "../lib/theme";
import SamplePic from "../assets/samplePic.jpg";
import { DateTime } from "luxon";
import useMobile from "../hooks/useMobile";
import MarkdownParser from "../components/Reusable/MarkdownParser";

const articleData = {
  title: "Lorem, ipsum dolor.",
  lastUpdated: new Date().toISOString(),
  slug: "sample-article",
  image: SamplePic,
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, voluptate.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tempore accusantium culpa natus voluptatem possimus asperiores consequatur provident tenetur, perspiciatis blanditiis quas. Asperiores beatae ab accusamus inventore repellat explicabo earum dignissimos illum tempora vero, sit possimus sapiente repellendus numquam error ullam debitis pariatur, mollitia delectus dolor, quas voluptate? Suscipit laudantium eius aut error? Consectetur natus placeat, similique cum sapiente facilis at accusamus dignissimos exercitationem maxime aliquam dicta, ea tempora dolore quod. Aspernatur nesciunt ratione nemo aut tempore! Earum fugiat ipsam animi maiores laboriosam qui officiis voluptate laudantium provident praesentium, saepe cum culpa nulla esse libero rem facilis porro doloribus. At, fugiat cupiditate. Earum maiores mollitia deleniti a facere, soluta cumque excepturi omnis vel unde aut incidunt, accusantium perferendis autem corrupti maxime quos distinctio itaque hic rem iusto. Quae tempora error reiciendis, omnis neque quasi sunt architecto modi repellendus perferendis laboriosam officia, magnam natus quidem ab odio tempore deserunt? Veniam perspiciatis harum ducimus quos perferendis placeat cum magni eveniet vel amet accusamus atque exercitationem voluptatem sequi tempore magnam labore dolor fugit velit ipsa a, dignissimos iure fugiat? Accusantium minima libero placeat quaerat ipsum animi totam odio officiis quisquam atque quos facere, delectus harum distinctio similique laudantium deleniti necessitatibus nihil rerum velit? Molestiae, nostrum asperiores! Obcaecati mollitia distinctio sed, velit rem cupiditate laboriosam, reprehenderit enim impedit a aliquid provident facilis tempore dicta quibusdam autem voluptas suscipit molestias dolorum ex non. Voluptas, esse. Reprehenderit unde ratione dignissimos! Earum doloremque maiores optio facere ratione fuga possimus ut numquam mollitia nulla repudiandae eaque, excepturi praesentium corrupti voluptatum natus, tempore quas fugiat temporibus reiciendis in sed similique placeat aspernatur. Magnam odio quae enim voluptas. Animi optio consequuntur sed iusto. Ea maxime minus facere perspiciatis, placeat nihil perferendis. Ipsa in placeat molestias nesciunt accusantium, at fugiat perspiciatis rerum, voluptatum corporis error! Repellendus quibusdam minima asperiores quo corrupti!",
};

const ArticleEntry: React.VFC = () => {
  const mobile = useMobile();
  const { slug } = useParams();

  const { content, title, image, lastUpdated } = articleData;

  // *************** RENDER *************** //
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
          Current
        </MUILink>
      </Breadcrumbs>
      {image && (
        <Box
          sx={{
            background: `url('${image}')`,
            backgroundSize: "cover",
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
            {DateTime.fromISO(lastUpdated).toFormat("dd MMM yyyy")}
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
