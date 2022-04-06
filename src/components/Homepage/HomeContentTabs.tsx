import { Box, Typography, Tabs, Tab, Container } from "@mui/material";
import { useState, ReactNode } from "react";
import { FONTS } from "lib/theme";
import GlitchFont from "../Reusable/GlitchFont";
import MarkdownParser from "../Reusable/MarkdownParser";
import BigSectionWrapper from "./BigSectionWrapper";
import FillerDivider from "./FillerDivider";
import tabsActiveSymbol from "../../assets/images/tabsActiveSymbol.png";
import { centerFlex } from "lib/sxUtils";

const textContent: string = `Dark Terminal is bringing a new and innovative approach to NFT minting on Solana.
From our experiences on other blockchains, we were shocked to find out that Solana is missing on a lot of interesting and exciting ways to mint and use the NFTs.`;

interface TabEntry {
  title: ReactNode | string;
  content: string;
}

const TabsData: TabEntry[] = [
  {
    title: "PACK MINTING",
    content: `<p>
   First feature that our minting services will provide will be the ability to create Pack mints. What this means is that people will be buying a Pack NFT, which they can open and receive any number of additional NFTs from it. A perfect example for this would be a Card Game which uses NFTs for their game. 
   </p> 
  <br />
  <p>
    People can buy a Booster Pack, or a Starter Pack, which holds 10 different cards inside it. The rarity of the cards found inside can be adjusted, so you can have 2 Legendary cards and 8 Common cards, or you can assign a % of drop chance for each slot. 
    </p> 
    <br />
    <p>
    For example the first card in the pack can have a 5% chance to be a Legendary, 15% chance to be an Epic, 30% chance to be an Uncommon and 50% chance to be a Common card.
    </p>`,
  },
  {
    title: "GENERATIVE NFTS",
    content:
      "<p>Anyone will be able to set up their own generative art style mint directly from our browser interface.</p>",
  },
  {
    title: "NFT BLENDS",
    content: `<p>The second feature we are developing is the Blending mechanism, which allows you to burn 1 
     or more NFTs and receive a new NFT in return.<p> 
     <p>This can be used for mechanics such as upgrading lower rarity NFTs into a higher rarity one, 
      upgrading a Character level NFT to a higher Character level, upgrading weapons / items, cards or any
      other NFT gaming systems projects might use.</p>`,
  },
];

const title = (
  <Box component="span">
    <Box component="span" sx={{ color: "common.white" }}>
      DARK TERMINAL
    </Box>{" "}
    <Box component="span" sx={{ color: "primary.main" }}>
      MINTING
    </Box>
  </Box>
);

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export type HomeContentTabsPropsType = {};

function a11yProps(index: number) {
  return {
    id: `darkTerminalTab-tab-${index}`,
    "aria-controls": `darkTerminalTab-tabpanel-${index}`,
  };
}

const HomeContentTabs: React.VFC<HomeContentTabsPropsType> = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // *************** RENDER *************** //
  return (
    <BigSectionWrapper title={title}>
      <Container>
        <Box
          className="sectionDescription"
          sx={{
            margin: "0 auto",
            mb: [2, 2, 4],
            fontFamily: FONTS.SOURCE,
            color: "primary.light",
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <MarkdownParser>{textContent}</MarkdownParser>
        </Box>
        <Box
          sx={{
            width: "100%",
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            backgroundColor: "common.black",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Dark Terminal Content Tabs"
              scrollButtons="auto"
              variant="scrollable"
            >
              {TabsData.map((item, index: number) => {
                const active = value === index;
                return (
                  <Tab
                    key={index}
                    label={
                      <Box
                        sx={{
                          fontSize: ["0.9rem", "0.9rem", "1.25rem"],
                          px: [0, 0, 2],
                          py: [0, 0, 1],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textShadow: (theme) =>
                            !active
                              ? "none"
                              : `2px 2px 15px ${theme.palette.primary.main}`,
                          color: active ? "common.white" : "primary.light",
                        }}
                      >
                        {active && (
                          <Box sx={{ ...centerFlex, mr: 1 }}>
                            <img
                              src={tabsActiveSymbol}
                              style={{
                                width: "26px",
                                opacity: active ? "1" : "0",
                              }}
                              alt="tabs active symbol"
                            />
                          </Box>
                        )}
                        <GlitchFont>{item.title}</GlitchFont>
                      </Box>
                    }
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </Box>
          {TabsData.map((item, index: number) => {
            return (
              <TabPanel value={value} index={index} key={index}>
                <Box
                  sx={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    fontFamily: FONTS.SOURCE,
                    fontWeight: 300,
                  }}
                >
                  <MarkdownParser>{item.content}</MarkdownParser>
                </Box>
              </TabPanel>
            );
          })}
        </Box>
      </Container>
      <FillerDivider sx={{ mt: [3, 3, 7] }} />
    </BigSectionWrapper>
  );
};

export default HomeContentTabs;
