import { Route, Routes } from "react-router-dom";
import "./App.css";
import FourOhFour from "./components/FourOhFour/404";
import Footer from "./components/Reusable/Layout/Footer/Footer";
import Header from "./components/Reusable/Layout/Header/Header";
import Home from "./Pages/Home";
import HowToBuy from "./Pages/HowToBuy";
import NewsPage from "./Pages/NewsPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<HowToBuy />} path="how-to-buy" />
        <Route element={<NewsPage />} path="news" />
        <Route element={<FourOhFour />} path="*" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
