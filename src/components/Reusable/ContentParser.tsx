import { Box, SxProps } from "@mui/system";
import { FONTS } from "../../lib/theme";
import MarkdownParser from "./MarkdownParser";

export type ContentParserPropsType = {
  children?: any;
  sx?: SxProps;
};

const ContentParser: React.VFC<ContentParserPropsType> = ({ children, sx }) => {
  // *************** RENDER *************** //
  return (
    <Box sx={{ fontFamily: FONTS.SOURCE, ...sx }}>
      <MarkdownParser>{children}</MarkdownParser>
    </Box>
  );
};

export default ContentParser;
