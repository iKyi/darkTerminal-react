import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useMobile from "../../../hooks/useMobile";
import axiosGetter from "../../../lib/axios/axiosGetter";
import { getStrapiURL } from "../../../lib/theme/api";
import ConsoleElement from "./components/ConsoleElement";
import ConsoleNavigation from "./components/ConsoleNavigation";
import WalletBox from "./components/WalletBox";

export interface IWalletEntry {
  name: string;
  value: string | number;
  currency: string;
}

// const walletData: IWalletEntry[] = [
//   {
//     name: "NFTS",
//     value: 3,
//     currency: "HACKERS",
//   },
//   {
//     name: "DTAC",
//     value: 2500,
//     currency: "ON STAKE START",
//   },
//   {
//     name: "DTAC",
//     value: 1000,
//     currency: "PRE-SALE BONUS",
//   },
// ];

export type ConsoleWrapperPropsType = {
  children?: any;
};

const ConsoleWrapper: React.VFC<ConsoleWrapperPropsType> = ({ children }) => {
  const [sections, setData] = useState<any>(null);

  useEffect(() => {
    axiosGetter(getStrapiURL("console-info-items?populate=*")).then((resp) => {
      setData(
        resp.data.map((item: Record<any, any>) => {
          return { id: item.id, ...item.attributes };
        })
      );
    });
  }, []);

  const isMobile = useMobile(true);

  const [activeSection, setActiveSection] = useState<number>(0);

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 5.5,
      }}
    >
      <Container>
        <Grid container spacing={isMobile ? 1 : 2}>
          {sections && (
            <Grid
              item
              xs={12}
              lg={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                order: isMobile ? 3 : 0,
              }}
            >
              <ConsoleElement
                activeSection={activeSection}
                sections={sections}
              />
            </Grid>
          )}

          <Grid item xs={12} lg={4} sx={{ order: isMobile ? 0 : 3 }}>
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
  );
};

export default ConsoleWrapper;
