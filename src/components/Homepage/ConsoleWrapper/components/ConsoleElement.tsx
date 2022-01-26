import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import ConsoleHeader from "../../../../assets/sections/homepage/consoleHeader.png";
import GlitchFont from "../../../Reusable/GlitchFont";
import { Box } from "@mui/system";

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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export type ConsoleElementPropsType = {
  children?: any;
  activeSection: number;
  sections: any[];
};

const ConsoleElement: React.VFC<ConsoleElementPropsType> = ({
  children,
  activeSection,
  sections,
}) => {
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
            px: 4,
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
            <GlitchFont sx={{}}>HACKED TERMINAL</GlitchFont>
            <Typography sx={{ fontSize: "1.3rem", lineHeight: 2 }}>
              {"_____<"}
            </Typography>
          </Box>
        </Box>
        {/* CARD CONTENT */}
        <Box
          sx={{
            p: 4,
          }}
        >
          {sections.map((item, index) => {
            return (
              <TabPanel key={item.title} value={activeSection} index={index}>
                {item.content}
              </TabPanel>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsoleElement;
