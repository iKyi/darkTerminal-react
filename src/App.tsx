import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FourOhFour from "./components/FourOhFour/404";
import GlobalModalsWrapper from "./components/GlobalModalsWrapper";
import NewsIndex from "./components/Newspage/NewsIndex";
import { startAnimation } from "./lib/bgAnim";
import ArticleEntry from "./Pages/ArticleEntry";
import Home from "./Pages/Home";
import HowToBuy from "./Pages/HowToBuy";
import NewsPage from "./Pages/NewsPage";
import MintPage from "./Pages/MintPage";
import SnackbarProvider from "./providers/SnackbarProvider";
import useStakeAction from "./hooks/useStakeAction";
import Stake from "./Pages/Stake";
import StakeIndex from "./components/Stake/StakeIndex";
import StakeCardEntry from "./components/Stake/StakeCardEntry";
import AppLoader from "./components/Reusable/AppLoader";
import BlockingSnabarsProvider from "./components/BlockingSnabarsProvider";

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
        <Route path="mint" element={<MintPage />} />
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
