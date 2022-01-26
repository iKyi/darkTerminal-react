import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import useMobile from "../../../hooks/useMobile";
import ConsoleElement from "./components/ConsoleElement";
import ConsoleNavigation from "./components/ConsoleNavigation";
import WalletBox from "./components/WalletBox";

const consoleItems = [
  {
    id: 0,
    title: "Dark Terminal",
    content: `<p>content content content </p>`,
  },
  {
    id: 1,
    title: "Bet Terminal",
    content: `<p>content content content 2</p>`,
  },
  {
    id: 2,
    title: "Hacking the system",
    content: `<p>content content content 3 </p>`,
  },
  {
    id: 3,
    title: "Leaderboards",
    content: `<p>content content content  4</p>`,
  },
  {
    id: 4,
    title: "Prizes",
    content: `<p>content content content  5</p>`,
  },
];

export interface IWalletEntry {
  name: string;
  value: string | number;
  currency: string;
}

const walletData: IWalletEntry[] = [
  {
    name: "NFTS",
    value: 2,
    currency: "NFTS",
  },
  {
    name: "COINS",
    value: 3500,
    currency: "DTAC",
  },
  {
    name: "LABEL",
    value: "VALUE",
    currency: "LABEL",
  },
];

export type ConsoleWrapperPropsType = {
  children?: any;
};

const ConsoleWrapper: React.VFC<ConsoleWrapperPropsType> = ({ children }) => {
  const isMobile = useMobile(true);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [sections, setSections] = useState(consoleItems);

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 5.5,
      }}
    >
      <Container>
        <Grid container spacing={isMobile ? 1 : 2}>
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
            <ConsoleElement activeSection={activeSection} sections={sections} />
          </Grid>
          <Grid item xs={12} lg={4} sx={{ order: isMobile ? 0 : 3 }}>
            <Grid
              container
              rowSpacing={isMobile ? 1 : 2}
              columnSpacing={isMobile ? 1 : 0}
            >
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
              <Grid
                item
                xs={12}
                md={6}
                lg={12}
                sx={{ order: isMobile ? 0 : 3 }}
              >
                <WalletBox walletData={walletData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ConsoleWrapper;
