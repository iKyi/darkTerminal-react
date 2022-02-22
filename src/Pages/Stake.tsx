import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import ConsoleElement from "src/components/Homepage/ConsoleWrapper/components/ConsoleElement";
import ConsoleNavigation from "src/components/Homepage/ConsoleWrapper/components/ConsoleNavigation";
import WalletBox from "src/components/Homepage/ConsoleWrapper/components/WalletBox";
import Header from "src/components/Reusable/Layout/Header/Header";
import useMobile from "src/hooks/useMobile";
import StrapiPublicProvider from "src/providers/StrapiPublicProvider";
// import SeoComp from "src/components/Reusable/Seo";

export type StakePropsType = {
  children?: any;
};

const Stake: React.VFC<StakePropsType> = ({ children }) => {
  const isMobile = useMobile(true);
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = useMemo(() => {
    return [
      {
        title: "NFTs",
        content: "lala",
      },
    ];
  }, []);
  // *************** RENDER *************** //
  return (
    <StrapiPublicProvider>
      <Header />
      {/* <SeoComp seo={seo} /> */}
      <Box
        sx={{
          py: 5.5,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: "1650px", width: "100%" }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            {sections && (
              <Grid
                item
                xs={12}
                lg={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  order: isMobile ? 3 : 0,
                }}
              >
                <ConsoleElement
                  activeSection={activeSection}
                  sections={sections}
                  title="NFTS"
                >
                  <Outlet />
                </ConsoleElement>
              </Grid>
            )}

            <Grid item xs={12} lg={3} sx={{ order: isMobile ? 0 : 3 }}>
              <Grid
                container
                rowSpacing={isMobile ? 1 : 2}
                columnSpacing={isMobile ? 1 : 0}
              >
                {sections && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={12}
                    sx={{ order: isMobile ? 3 : 0 }}
                  >
                    <ConsoleNavigation
                      activeSection={activeSection}
                      sections={sections}
                      setActiveSection={setActiveSection}
                    />
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={12}
                  sx={{ order: isMobile ? 0 : 3 }}
                >
                  <WalletBox />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </StrapiPublicProvider>
  );
};

export default Stake;
