import {
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useMobile from "hooks/useMobile";
import IndicatorBox from "assets/sections/homepage/indicatorBox.png";
import NavigationHeader from "assets/sections/homepage/navigationHeader.png";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export type ConsoleNavigationPropsType = {
  children?: any;
  sections: any[];
  setActiveSection: (params?: any) => any;
  activeSection: number;
};

const ConsoleNavigation: React.VFC<ConsoleNavigationPropsType> = ({
  children,
  sections,
  setActiveSection,
  activeSection = 0,
}) => {
  const mobile = useMobile();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSection(newValue);
  };

  // *************** RENDER *************** //
  if (!sections || sections.length === 0) return null;
  return (
    <Card
      sx={{
        background: "none",
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
            Dark Terminal Navigation
          </Typography>
        }
        sx={{
          background: `url('${NavigationHeader}')`,
          backgroundSize: "100% 100%",
          border: 0,
        }}
      />
      <CardContent
        sx={{
          borderColor: "primary.main",
          borderWidth: 1,
          borderStyle: "solid",
          borderTop: "none",
          backgroundColor: `primary.dark`,
          minHeight: !mobile ? "350px" : 0,
        }}
      >
        <Tabs
          orientation="vertical"
          value={activeSection}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: "primary.main",
            maxHeight: "100%",
          }}
          variant="scrollable"
          TabIndicatorProps={{
            style: {
              background: `url('${IndicatorBox}')`,
              backgroundPosition: "center calc(50% + 5px)",
              backgroundRepeat: "no-repeat",
              width: "37px",
              height: "40px",
            },
          }}
        >
          {sections.map((item, index) => {
            return (
              <Tab
                key={item.title}
                sx={{
                  color: "primary.light",
                  "&.Mui-selected": {
                    color: "error.main",
                  },
                }}
                label={
                  <Typography
                    sx={{
                      fontFamily: "Furore",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {item.title}
                  </Typography>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConsoleNavigation;
