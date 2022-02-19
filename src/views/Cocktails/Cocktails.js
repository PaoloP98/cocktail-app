import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import CocktailBreadcrumb from "../../components/Breadcrumb/CocktailBreadcrumb/CocktailBreadcrumb";
import LoadingError from "../../components/FetchStatus/LoadingError/LoadingError";
import LoadingSpinner from "../../components/FetchStatus/LoadingSpinner/LoadingSpinner";
import CocktailService from "../../services/cocktail-service";
import style from "./Cocktails.module.css";
import CocktailsGrid from "./components/CocktailsGrid/CocktailsGrid";
import CocktailsTable from "./components/CocktailsTable/CocktailsTable";

function Cocktails() {

  const params = useParams();
  const category = params.string;

  const [displayGrid, setDisplayGrid] = useState(true);
  const [viewAlcoholic, setViewAlcoholic] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const [cocktails, setCocktails] = useState([]);
  const [filterdCocktails, setFilterdCocktails] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  
  function getCocktails(isMounted) {
    setIsLoading(true);
    setHasError(false);
    let request = null;
    if (category != undefined) {
      request = CocktailService.getCocktailFilteredByCategory(category);
    }
    else {
      if (viewAlcoholic)
      request = CocktailService.getAlcoholicCocktail();
      else
      request = CocktailService.getNonAlcoholicCocktail();
    }
    request
      .then((response) => {
        try {
          if (isMounted) {
            setCocktails(response);
            setFilterdCocktails(response);
          }
        } catch (e) {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }


  useEffect(() => {
    let isMounted = true;
    getCocktails(isMounted);
    return () => {
      isMounted = false;
    }
  }, [viewAlcoholic]);


  function filterData(input) {
    input = input.toLowerCase();
    let filteredCocktails = cocktails.drinks.filter(d => d.strDrink.toLowerCase().includes(input));
    setFilterdCocktails({
      drinks: filteredCocktails
    });
    setFilterInput(input);
  }



  if (hasError) {
    return <LoadingError />;
  }
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  
  return (
    <>
      <CocktailBreadcrumb
        strCategory={category}
      />

      <div className={`${style.switch} d-flex justify-content-end`}>
        <div
          onClick={() => {
            setDisplayGrid(true);
          }}
          className={`${style.option} ${displayGrid ? style.active : ""}`}
        ><span>Griglia</span>
        </div>
        <div
          onClick={() => {
            setDisplayGrid(false);
          }}
          className={`${style.option} ${!displayGrid ? style.active : ""}`}>Lista</div>
      </div>

          
      {category == undefined ?
        <div className={`${style.switch} d-flex justify-content-end`}>
          <div
            onClick={() => {
              setViewAlcoholic(true);
            }}
            className={`${style.option} ${viewAlcoholic ? style.active : ""}`}
          ><span>Alcolici</span>
          </div>
          <div
            onClick={() => {
              setViewAlcoholic(false);
            }}
            className={`${style.option} ${!viewAlcoholic ? style.active : ""}`}>Non alcolici</div>
        </div>
        : <></>
      }

      <Input
        className="my-4 w-50"
        placeholder="Cerca per nome..."
        onKeyUp={(e) => filterData(e.target.value)}
      />

      {displayGrid ?
        <CocktailsGrid
          cocktails={filterdCocktails}
          col={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          input={filterInput}
        /> :
        <CocktailsTable cocktails={cocktails} />}
    </>
  );
}
export default Cocktails;
