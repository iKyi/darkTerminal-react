import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ConsoleHeader from "assets/sections/homepage/consoleHeader.png";
import GlitchFont from "components/Reusable/GlitchFont";
import { Box } from "@mui/system";
import MarkdownParser from "components/Reusable/MarkdownParser";
import { FONTS } from "lib/theme";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import useMobile from "hooks/useMobile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export type ConsoleElementPropsType = {
  activeSection: number;
  sections: any[];
  children?: ReactNode;
  title?: string;
};

const ConsoleElement: React.VFC<ConsoleElementPropsType> = ({
  activeSection,
  sections,
  children,
  title,
}) => {
  const mobile = useMobile();
  const { pathname } = useLocation();
  // *************** RENDER *************** //
  return (
    <Card
      sx={{
        borderRadius: 0,
        background: "none",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{
              px: 2,
              fontFamily: "Furore",
              fontSize: "0.8rem",
              color: "primary.main",
            }}
          >
            Dark Terminal Console
          </Typography>
        }
        sx={{
          background: `url('${ConsoleHeader}')`,
          backgroundSize: "100% 100%",
        }}
      />

      <CardContent
        sx={{
          p: 0,
          flex: 1,
          borderColor: "primary.main",
          borderWidth: 1,
          borderStyle: "solid",
          borderTop: "none",
          backgroundColor: `primary.dark`,
        }}
      >
        <Box
          sx={{
            px: [1, 3],
            py: 2,
            backgroundColor: `rgba(0,120,0,0.10)`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "primary.main",
              borderBottom: (theme) =>
                `3px solid ${theme.palette.primary.main}`,
            }}
          >
            <GlitchFont sx={{ fontSize: ["1.3rem", "1.3rem", "1.5rem"] }}>
              {title ? title : "HACKED TERMINAL"}
            </GlitchFont>
            <Box
              sx={{
                color: "error.main",
                fontSize: ["1rem", "1rem", "1.1rem"],
                lineHeight: 2,
                fontWeight: "bold",
                fontFamily: FONTS.FURORE,
              }}
            >
              @ROOT
            </Box>
          </Box>
        </Box>
        {/* CARD CONTENT */}
        <Box
          sx={{
            p: [1, 3],
            maxHeight: mobile ? "none" : "650px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          {!children &&
            sections.map((item, index) => {
              return (
                <TabPanel key={item.title} value={activeSection} index={index}>
                  <Box
                    sx={{
                      fontFamily: FONTS.SOURCE,
                      color: "primary.light",
                    }}
                  >
                    <MarkdownParser>{item.content}</MarkdownParser>
                  </Box>
                </TabPanel>
              );
            })}
          {children && (
            <TabPanel key={pathname} value={1} index={1}>
              {children}
            </TabPanel>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsoleElement;
