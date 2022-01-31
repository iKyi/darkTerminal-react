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
    content: `<h2>&gt;_ WHAT IS Dark terminal</h2>
    <p>&gt;__ Dark Terminal is a Play 2 Earn NFT game on the Solana Blockchain.</p>
    <p>In Dark Terminal, players compete in Operations that last 60 days to win rewards.</p>
    <p>&nbsp;</p>
    <p>&gt;__ During these 60 days the prize pool of the ongoing Operation is completely distributed, before the start of the next one.</p>
    <p>Players will try to hack into The System and reap the rewards.</p>
    <p>&nbsp;</p>
    <p>&gt;__ The System is divided in three: <strong>The Main System</strong>, <strong>The Secondary System</strong> and <strong>The Tertiary System</strong>.</p>
    <p>The Main System is reached by completing all 8 hacking sequences, the Secondary System is reached by completing 7 out of the 8 hacking sequences and the Tertiary System is reached by completing the first 6 hacking sequences.</p>
    <p>&nbsp;</p>
    <p>&gt;__ After 50 days, The System closes, and all players who managed to Hack into The System will have 10 days to compete against each other to win the Leaderboard prizes.</p>`,
  },
  {
    id: 1,
    title: "NFTs",
    content: `<h2>&gt;_ DARK TERMINAL NFTs</h2>
    <p style='font-weight: bold; color: #EB1545;'>&gt;__ At least 1 Dark Terminal NFT is required to play the game!</p>
    <p>&nbsp;</p>
    <p>&gt;__ The main benefit of owning a Dark Terminal NFTs is having access to the Dark Terminal Full Sequence.</p>
    <p>&nbsp;</p>
    <p>&gt;__ Staking a Dark Terminal NFT for the duration of the event will guarantee an airdrop of 2500 DTAC coins, per NFT purchased, at the begining of the locked staking interval. Players who have purchased Pre-Sale NFTs will be airdropped 3500 DTAC coins instead.</p>
    <h4>&gt;_ NYX - 777 Max Supply | Mint: 2 SOL</h4>
    <p>&gt;__ NYX has a supply of only 777 and holders of this NFT will receive 50% of all royalties earned by Dark Terminal. The rewards will be distributed evenly between the 777 NFTs once every month.</p>
    <h4>&gt;_ D3GEN - 3000 Max Supply | Mint: 2 SOL</h4>
    <h4>&gt;_ CODEX - 4000 Max Supply | Mint: 2 SOL</h4>
    <h3>&gt;_ GENERATIVE NFT AIRDROP</h3>
    <p>&gt;__ At the end of each Operation, after 60 days, a unique generative NFT will be airdropped to the owners of one of the three Hacker NFTs. The airdrop will be given to each NFT, so holding more than one hackers will get you airdropped more NFTs.</p>`,
  },
  {
    id: 2,
    title: "Staking",
    content: `<h2>&gt;_ Staking Dark Terminal NFTs</h2>
    <p>&gt;__ Players will need to stake their Dark Terminal NFTs, for the duration of the Operation (60 days). That means that once you stake a Dark Terminal NFT it cannot be unstaked and returned to your wallet until 60 days have passed and the Operation completes.</p>
    <p>Each NFT staked will award the player with 2500 DTAC coins that will be airdropped directly to their staking wallet at the begining of the stake period.</p>
    <p>&nbsp;</p>
    <p>&gt;__ Players that purchased the NFTs at Pre-Sale will be airdropped 1000 DTAC coins for each Pre-Sale NFT purchased, regardless if they decide to stake them or not.</p>
    <p>DTAC Coins are required to complete the system hacks!</p>
    <h3>&gt;_ Full Hacker Set Staking</h3>
    <p>&gt;__ Having a full set of all the 3 different Hackers NFTs at the end of the Operation makes you eligible for the Full Hacker Set prize of 0.33% (36.2 SOL*) that is awarded to 30 random stakers each.</p>`,
  },
  {
    id: 3,
    title: "Hacking the system",
    content: `<h2>&gt;_ Hack the Main System</h2>
    <p>&gt;__ Players will hack into The Main System by completing all 8 hacking sequences. You will need to own and stake a Dark Terminal NFT to have access to the 8th sequence.</p>
    <p>&nbsp;</p>
    <p>&gt;__ Upon successfully hacking into The Main System, you are qualified for the next phase of the Operation, where you will battle the other players who also managed to break into the system, for the Leaderboard prizes of The Main System.</p>
    <h3>&gt;_ DEFEAT OTHER PLAYERS TO WIN THE BLACK BOX</h3>
    <p>&gt;__ After completing all the 8 sequences, you will compete against all the other players that also managed to hack into The Main System.</p>
    <p>The tournament starts on the 50th day of the Operation and lasts for 10 days.</p>
    <p>Each player will have a fixed number of 100 tries and an infinite amount of hacking sequences. All sequences have only 2 options.</p>
    <p>&nbsp;</p>
    <p>&gt;__ The players who reach the highest sequences using the 100 tries will win the Leaderboard prizes of The Main System.</p>
    <p>If you manage to Hack The Main System multiple times, each additional successful hack will give COMPLETE 8 SEQUENCE EXAMPLE you 100 more tries.</p>`,
  },
  {
    id: 4,
    title: "Operations",
    content: `<h2>&gt;_ DARK TERMINAL OPERATIONS</h2>
    <p>&gt;__ Dark Terminal plays out in Operations. Each Operation runs for exactly 60 days, during which the complete prize pool is distributed to the players, before the next Operation begins.</p>
    <p>&nbsp;</p>
    <p>&gt;__ The first 50 days are dedicated for players to try and Hack into The System, while the last 10 days are for players who managed to Hack into The Main System, The Secondary System and The Tertiary System to climb the leaderboards and win the prizes.</p>
    <p>&nbsp;</p>
    <p>&gt;__ After all the Leaderboard prizes have been won, we randomly draw the Full Hacker Set winners and the Operation reaches its end.</p>
    <h4>&gt;_ Operation Specific NFTs</h4>
    <p>&gt;__ <small>Each Operation has its own NFTs. Once the Operation ends, the same NFTs cannot be used for the future Operations. Additional use cases will be given to the deprecated NFTs through partnerships.</small></p>
    <h4>&gt;_ DTAC Distribution</h4>
    <p>&gt;__ <small>At the beginning of each Operation, the total supply of DTAC that was pooled from the previous Operation's hacking attempts will be redistributed evenly between all the new issued NFTs for the After all the Leaderboard prizes have been won, we current Operation.</small></p>`,
  },
  {
    id: 5,
    title: "Prizes",
    content: `<h2>&gt;_ PRIZE POOLS</h2>
    <p style='font-weight: bold; color: #EB1545;'>&gt;__ Prizes displayed in SOL are the amounts if the NFT drop sells out.</p>
    <h4>&gt;_ MAIN SYSTEM (60% of prize pool - ~6532 SOL*)</h4>
    <p>&gt;__ <strong>Rewarded for:</strong> Hacking into The Main System and finishing in the top places on the leaderboard.</p>
    <h4>&gt;_ SECONDARY SYSTEM (20% of prize pool - ~2177 SOL*)</h4>
    <p>&gt;__ <strong>Rewarded for:</strong> Hacking into The Secondary System and finishing in the top places on the leaderboard.</p>
    <h4>&gt;_ TERTIARY SYSTEM (10% of prize pool - ~1088 SOL*)</h4>
    <p>&gt;__ <strong>Rewarded for:</strong> Hacking into The Tertiary System and finishing in the top places on the leaderboard.</p>
    <h4>&gt;_ HACKER SET (10% of prize pool - ~1088 SOL*)</h4>
    <p>&gt;__ <strong>Rewarded for:</strong> Awarded to 30 random players who staked a full set of 3 different hackers.</p>`,
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
    value: 3,
    currency: "HACKERS",
  },
  {
    name: "DTAC",
    value: 2500,
    currency: "ON STAKE START",
  },
  {
    name: "DTAC",
    value: 1000,
    currency: "PRE-SALE BONUS",
  },
];

export type ConsoleWrapperPropsType = {
  children?: any;
};

const ConsoleWrapper: React.VFC<ConsoleWrapperPropsType> = ({ children }) => {
  const isMobile = useMobile(true);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [sections] = useState(consoleItems);

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
