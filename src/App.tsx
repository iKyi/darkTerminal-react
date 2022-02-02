import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import FourOhFour from "./components/FourOhFour/404";
import GlobalModalsWrapper from "./components/GlobalModalsWrapper";
import NewsIndex from "./components/Newspage/NewsIndex";
import { startAnimation, stopAnimation } from "./lib/bgAnim";
import ArticleEntry from "./Pages/ArticleEntry";
import GamePage from "./Pages/GamePage";
import Home from "./Pages/Home";
import HowToBuy from "./Pages/HowToBuy";
import NewsPage from "./Pages/NewsPage";
// import GameHome from "./Game/GameHome/GameHome";
import GameDashboard from "./Game/GameDashboard/GameDashboard";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const animationValue = (window as any).animationInterval;
    const includes = pathname.includes("game");
    if (includes && animationValue) {
      stopAnimation();
    } else if (!includes && !animationValue) {
      startAnimation();
    }
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<HowToBuy />} path="how-to-buy" />
        <Route element={<NewsPage />} path="news">
          <Route element={<NewsIndex />} index />
          <Route element={<ArticleEntry />} path=":slug" />
        </Route>

        <Route element={<FourOhFour />} path="*" />
        <Route path="game" element={<GamePage />}>
          <Route index element={<GameDashboard />}></Route>
        </Route>
      </Routes>
      <GlobalModalsWrapper />
    </>
  );
}

export default App;
