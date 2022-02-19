import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CocktailBreadcrumb from "../../components/Breadcrumb/CocktailBreadcrumb/CocktailBreadcrumb";
import LoadingError from "../../components/FetchStatus/LoadingError/LoadingError";
import LoadingSpinner from "../../components/FetchStatus/LoadingSpinner/LoadingSpinner";
import CocktailService from "../../services/cocktail-service";
import { drinkDefaultImage, getCocktailsIngredientsAndMeasures } from "../../_utility/_utility";
import style from "./CocktailInfo.module.css";
import Ingredient from "./components/Ingredient/Ingredient";
import Instruction from "./components/Instruction/Instruction";

function CocktailInfo() {
  const params = useParams();
  const id = parseInt(params.number, 10);

  const [cocktailData, setCocktailData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isNaN(id)) {
      // Se l'id ricevuto non è numerico lo useEffect non prosegue.
      // Quindi, in questo caso non verrà chiamato l'endpoint per ottenere i dettagli del drink
      setHasError(true);
      return;
    }
    setIsLoading(true);
    setHasError(false);
    CocktailService.getCocktailDetailsByID(id)
      .then((result) => {
        let cocktailInfo = null;
        // "result" ha valore null se l'api non retituisce dati per un determinato id.
        // Es: id non presente nel database
        // Andrà quindi in errore quando tenterà di leggere il campo "drinks" di result. Il try catch gestisce il caso.
        try {
          if (isMounted) {
            cocktailInfo = result.drinks[0];
            setCocktailData(cocktailInfo);
          }
        } catch (e) {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
    return () => {
      isMounted = false;
    }
  }, [id]);

  if (hasError) {
    return (
      <LoadingError />
    );
  }
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  let ingredients = [], measures = [];

  let ingredientsAndMeasures = getCocktailsIngredientsAndMeasures(cocktailData);
  ingredients = ingredientsAndMeasures.ingredients;
  measures = ingredientsAndMeasures.measures;

  return (
    <>
      <CocktailBreadcrumb
        strDrink={cocktailData?.strDrink}
        strCategory={cocktailData?.strCategory}
      />
      <h1>{cocktailData?.strDrink}</h1>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
        <div className={style.cocktail_image_wrapper}>
          <img
            onError={(event) => drinkDefaultImage(event)}
            className={style.cocktail_image}
            src={cocktailData?.strDrinkThumb}
            alt={cocktailData?.strDrink}
          />
        </div>
        <div className="ms-md-4 mt-4">
          {cocktailData?.dateModified != null ?
            <p><strong>Data modifica</strong>: {cocktailData?.dateModified}</p>
            : <></>
          }
          <p><strong>Tipo di bicchiere</strong>: {cocktailData?.strGlass}</p>
        </div>
      </div>
      <div className="mt-4">
        <Ingredient
          ingredients={ingredients}
          measures={measures}
        />
        <Instruction
          strInstructions={cocktailData?.strInstructions}
          strInstructionsIT={cocktailData?.strInstructionsIT}
        ></Instruction>
      </div>

    </>
  );
}
export default CocktailInfo;
