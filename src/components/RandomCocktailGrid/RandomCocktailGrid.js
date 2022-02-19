import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col } from "reactstrap";
import CocktailService from "../../services/cocktail-service";
import { getCocktailsIngredientsAndMeasures } from "../../_utility/_utility";
import CocktailCard from "../Card/CocktailCard/CocktailCard";
import LoadingError from "../FetchStatus/LoadingError/LoadingError";
import LoadingSpinner from "../FetchStatus/LoadingSpinner/LoadingSpinner";

function RandomCocktailGrid({ numberOfCocktails = 3, col }) {
  RandomCocktailGrid.propTypes = {
    numberOfCocktails: PropTypes.number,
    col: PropTypes.object.isRequired,
  };

  const [cocktailsData, setCocktailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);


  function loadRandomCocktail() {
    let promises = [];
    for (let i = 0; i < numberOfCocktails; i++) {
      promises.push(CocktailService.getRandomCocktail());
    }
    setIsLoading(true);
    setHasError(false);
    Promise.all(promises)
      .then((response) => {
        try {
          let cocktails = [];
          for (let i = 0; i < response.length; i++) {
            cocktails.push(response[i].drinks[0]);
          }
          setCocktailsData(cocktails);
        } catch (e) {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadRandomCocktail();
    }
    return () => {
      isMounted = false;
    }
  }, []);

  if (hasError) {
    return (
      <LoadingError />
    );
  }

  const cocktailDivStyle = {
    position: 'relative',
    minHeight: '300px',
  };

  const listItems = cocktailsData.map((cocktail, index) => {
    let ingredients = [], measures = [];

    let ingredientsAndMeasures = getCocktailsIngredientsAndMeasures(cocktail);
    ingredients = ingredientsAndMeasures.ingredients;
    measures = ingredientsAndMeasures.measures;

    return (

      <Col md="4" style={cocktailDivStyle} className="mb-3" key={index}>
        {isLoading ?
          <LoadingSpinner /> :
          <CocktailCard
            cocktailName={cocktail?.strDrink}
            imgUrl={cocktail?.strDrinkThumb}
            idDrink={parseInt(cocktail?.idDrink)}
            strCategory={cocktail?.strCategory}
            ingredients={ingredients}
            measures={measures}

          />}
      </Col>
    );

  });

  return (
    <>
      <h2>Alcune proposte</h2>
      <p>Alcuni cocktails scelti casualmente</p>
      <Button
        color="primary"
        onClick={loadRandomCocktail}>
        Proponi qualcosa di diverso
      </Button>
      <div className={`
                row
                row-cols-${col.xs}
                row-cols-sm-${col.sm}
                row-cols-md-${col.md}
                row-cols-lg-${col.lg}
                g-4
                my-3
        `}>
        {listItems}
      </div>
    </>

  );
}
export default RandomCocktailGrid;
