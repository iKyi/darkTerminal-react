import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConsoleElement from "components/Homepage/ConsoleWrapper/components/ConsoleElement";
import ConsoleNavigation from "components/Homepage/ConsoleWrapper/components/ConsoleNavigation";
import WalletBox from "components/Homepage/ConsoleWrapper/components/WalletBox";
import Header from "components/Reusable/Layout/Header/Header";
import SeoComp from "components/Reusable/Seo";
import { addLoader, removeLoader } from "features/global/globalSlice";
import useMobile from "hooks/useMobile";
import axiosGetter from "lib/axios/axiosGetter";
import { getStrapiURL } from "lib/theme/api";
import StrapiPublicProvider from "providers/StrapiPublicProvider";
// import SeoComp from "components/Reusable/Seo";

export type StakePropsType = {};

const Stake: React.VFC<StakePropsType> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    dispatch(addLoader("homeData"));
    axiosGetter(getStrapiURL("stake-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
      dispatch(removeLoader("homeData"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const seo = data?.seo ?? null;
  // *************** RENDER *************** //
  return (
    <StrapiPublicProvider>
      <Header />
      {seo && <SeoComp seo={seo} />}
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
