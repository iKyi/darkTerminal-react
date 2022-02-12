import { Typography, SxProps } from "@mui/material";
import { Box } from "@mui/system";
import useMobile from "../../hooks/useMobile";
import GlitchFont from "./GlitchFont";
import MarkdownParser from "./MarkdownParser";

export type PageHeaderPropsType = {
  children?: any;
  title: string;
  subtitle?: string;
  sx?: SxProps;
  smaller?: boolean;
};

const PageHeader: React.VFC<PageHeaderPropsType> = ({
  children,
  title,
  subtitle,
  sx,
  smaller,
}) => {
  const mobile = useMobile();
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: mobile ? 3.5 : 6,
        textAlign: "center",
        ...sx,
      }}
    >
      {subtitle && (
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: mobile ? "1.3rem" : smaller ? "1.6rem" : "1.8rem",
              fontFamily: "Futura",
              fontWeight: "600",
            }}
          >
            <MarkdownParser>{subtitle}</MarkdownParser>
          </Typography>
        </Box>
      )}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: mobile ? "2.2rem" : smaller ? "2.4rem" : "2.8rem",
            color: "primary.main",
          }}
        >
          <GlitchFont>
            <MarkdownParser>{title}</MarkdownParser>
          </GlitchFont>
        </Typography>
      </Box>

      {children}
    </Box>
  );
};

export default PageHeader;
