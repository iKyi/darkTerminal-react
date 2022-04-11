import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FourOhFour from "components/FourOhFour/404";
import GlobalModalsWrapper from "components/GlobalModalsWrapper";
import NewsIndex from "components/Newspage/NewsIndex";
import { startAnimation } from "./lib/bgAnim";
import ArticleEntry from "pages/ArticleEntry";
import Home from "pages/Home";
import HowToBuy from "pages/HowToBuy";
import NewsPage from "pages/NewsPage";
import SnackbarProvider from "providers/SnackbarProvider";
import useStakeAction from "hooks/useStakeAction";
import Stake from "pages/Stake";
import StakeIndex from "components/Stake/StakeIndex";
import StakeCardEntry from "components/Stake/StakeCardEntry";
import AppLoader from "components/Reusable/AppLoader";
import BlockingSnabarsProvider from "components/BlockingSnabarsProvider";
import { ROUTES } from "constants/routes";
import HackTheSystem from "components/Games/HackTheSystem";
import BinaryHack from "components/Games/BinaryHack";

function App() {
  const { wallet, connected } = useWallet();
  const { connection } = useConnection();
  const { debouncedRefreshNfts } = useStakeAction();

  useEffect(() => {
    debouncedRefreshNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, wallet, connected]);

  useEffect(() => {
    startAnimation();
  }, []);

  //   <Route element={<Mint />} path={mintRoutes.DASHBOARD}>

  //   <Route element={<DashboardMenuPage />} index />
  //   <Route element={<MintNftsPage />} path={mintRoutes.MINT_NFTS} />
  //   <Route
  //     element={<SchemasAndTemplatesPage />}
  //     path={mintRoutes.SCHEMAS_AND_TEMPLATES}
  //   />
  //   <Route element={<SetupDropPage />} path={mintRoutes.SETUP_DROP} />
  //   <Route element={<BlendsPage />} path={mintRoutes.BLENDS} />
  //   <Route
  //     element={<MintedOnDemandPacksPage />}
  //     path={mintRoutes.MINTED_ON_DEMAND_PACKS}
  //   />

  //   <Route element={<CollectionsPage />} path={mintRoutes.COLLECTIONS} />
  //   <Route element={<NFTsPage />} path={mintRoutes.NFTS} />
  //   <Route
  //     element={<NotificationsPage />}
  //     path={mintRoutes.NOTIFICATIONS}
  //   />
  // </Route>

  // useEffect(() => {
  //   const animationValue = (window as any).animationInterval;
  //   const includes = pathname.includes("game");
  //   if (includes && animationValue) {
  //     stopAnimation();
  //   } else if (!includes && !animationValue) {
  //     startAnimation();
  //   }
  // }, [pathname]);

  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<HowToBuy />} path="how-to-buy" />
        <Route element={<NewsPage />} path="news">
          <Route element={<NewsIndex />} index />
          <Route element={<ArticleEntry />} path=":slug" />
        </Route>
        <Route element={<Stake />} path="stake">
          <Route element={<StakeIndex />} index />
          <Route element={<StakeCardEntry />} path="/stake/:id" />
        </Route>
        <Route element={<HackTheSystem />} path={ROUTES.GAME_HACK} />
        <Route element={<BinaryHack />} path={ROUTES.GAME_BINARY} />
        <Route element={<FourOhFour />} path="*" />
      </Routes>
      <GlobalModalsWrapper />
      <SnackbarProvider />
      <AppLoader />
      <BlockingSnabarsProvider />
    </>
  );
}

export default App;
