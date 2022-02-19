import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Logo from "./assets/Images/logo-small.png";
import MainPage from "./components/MainPage/MainPage";
import CocktailInfo from "./views/CocktailInfo/CocktailInfo";
import Cocktails from "./views/Cocktails/Cocktails";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

function App() {

  const navItems = [
    { url: "/", text: "Home", exact: true },
    { url: "/cocktails", text: "Cocktails", exact: true },
  ];
  
  return (
    <BrowserRouter>
      <MainPage
        navItems={navItems}
        logo={Logo}
        footerCourseName="Tecnologie e Applicazioni dei Sistemi Distribuiti"
        footerCourseLink="https://elearning.unimib.it/course/view.php?id=37789"
      >

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cocktails" element={<Cocktails />} />
          <Route exact path="/cocktails/:string" element={<Cocktails />} />
          <Route exact path="/cocktail-info/:number" element={<CocktailInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </MainPage>
    </BrowserRouter>
  );
}

export default App;
