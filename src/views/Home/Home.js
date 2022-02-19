import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Logo from "../../assets/Images/logo.png";
import RandomCocktailGrid from "../../components/RandomCocktailGrid/RandomCocktailGrid";


function Home() {
  let navigate = useNavigate();
  return (
    <>
      <div className="col-xxl-8">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-10 col-sm-8 col-lg-6 position-relative">
            <img src={Logo} className="d-block mx-lg-auto img-fluid" alt="Eas Bar Logo" width="300" height="300" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Easy Bar</h1>
            <p className="lead">Trova le migliori ricette per preparare i tuoi cocktails preferiti</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Button
                color="primary"
                className="my-3"
                onClick={(e) => navigate("/cocktails")}>
                Consulta le ricette
              </Button>
            </div>
          </div>
        </div>
      </div>

      
      <RandomCocktailGrid
        numberOfCocktails={3}
        col={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 5 }}
      />
    </>
  );
}
export default Home;
