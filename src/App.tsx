import { Route, Routes } from "react-router-dom";
import "./App.css";
import FourOhFour from "./components/FourOhFour/404";
import GlobalModalsWrapper from "./components/GlobalModalsWrapper";
import NewsIndex from "./components/Newspage/NewsIndex";
import ArticleEntry from "./Pages/ArticleEntry";
import Home from "./Pages/Home";
import HowToBuy from "./Pages/HowToBuy";
import NewsPage from "./Pages/NewsPage";

function App() {
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
      </Routes>

      <GlobalModalsWrapper />
    </>
  );
}

export default App;
