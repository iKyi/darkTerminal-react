import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import arrowBg from "../assets/images/mint/arrowsBg.png";
import MintBox from "../components/Mint/MintBox";
import MintHeader from "../components/Mint/MintHeader";
import SolPerNftBox from "../components/Mint/SolPerNftBox";
import SupplyBox from "../components/Mint/SupplyBox";
import HeroImageBox from "../components/Reusable/HeroImageBox";
import MarkdownParser from "../components/Reusable/MarkdownParser";
import PageHeader from "../components/Reusable/PageHeader";
import SeoComp from "../components/Reusable/Seo";
import useMobile from "../hooks/useMobile";
import axiosGetter from "../lib/axios/axiosGetter";
import { FONTS } from "../lib/theme";
import { getStrapiURL } from "../lib/theme/api";
import StrapiPublicProvider from "../providers/StrapiPublicProvider";

export type MintPagePropsType = {};

const MintPage: React.VFC<MintPagePropsType> = () => {
  const Mobile = useMobile();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    axiosGetter(getStrapiURL("mint-page?populate=*")).then((resp) => {
      setData(resp.data.attributes);
    });
  }, []);

  const { seo, pageHeader, pageDesc } = data || {};

  const testItemClick = () => {
    console.log("clickt");
  };

  // *************** RENDER *************** //
  if (!data) return null;
  return (
    <StrapiPublicProvider>
      <SeoComp seo={seo} />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justfyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            px: Mobile ? 0 : 16,
            pb: Mobile ? 5 : 10,
            background: !Mobile ? `url('${arrowBg}')` : "none",
            backgroundSize: "98% calc(100% - 20px)",
            backgroundPosition: "center calc(100% - -2px)",
            backgroundRepeat: "no-repeat",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              width: "1280px",
              maxWidth: "100%",
            }}
          >
            <MintHeader>buttons here</MintHeader>
            <Box sx={{ px: 2 }}>
              <Grid
                container
                columnSpacing={Mobile ? 0 : 6}
                rowSpacing={Mobile ? 3 : 0}
              >
                <Grid item xs={12} lg={6}>
                  <PageHeader
                    {...pageHeader}
                    sx={{ textAlign: "left", py: 3 }}
                    smaller
                  />
                  {pageDesc && (
                    <Box
                      sx={{
                        fontFamily: FONTS.SOURCE,
                        color: "primary.light",
                      }}
                    >
                      <MarkdownParser>{pageDesc}</MarkdownParser>
                    </Box>
                  )}
                  <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <MintBox
                        onClick={testItemClick}
                        type={"PRESALE"}
                        disabled={false}
                        progress={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MintBox
                        onClick={testItemClick}
                        type={"WHITELIST"}
                        disabled={true}
                        progress={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MintBox
                        onClick={testItemClick}
                        type={"PUBLIC MINT"}
                        disabled={true}
                        progress={false}
                      />
                    </Grid>
                  </Grid>
                  <SolPerNftBox />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ pt: [0, 0, 6], mb: [8, 8, 0] }}>
                    <HeroImageBox />
                    <SupplyBox sx={{ mt: 3 }} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </StrapiPublicProvider>
  );
};

export default MintPage;
