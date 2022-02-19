import PropTypes from "prop-types";
import React from "react";
import { getIngredientImage, ingredientDefaultImage } from "../../../../_utility/_utility";

function Ingredient(props) {
  const { ingredients, measures } = props;
  Ingredient.propTypes = {
    ingredients: PropTypes.arrayOf(String).isRequired,
    measures: PropTypes.arrayOf(String).isRequired,
  };


  const listItems = ingredients.map((ingredient, index) => {
    let url = getIngredientImage(ingredient, "small");
    return (
      <div key={index} className="col-12 col-md-4 my-2">
        <img 
          onError={(event) => ingredientDefaultImage(event)}
          src={url}
          loading="lazy"
          alt={ingredient}
          height="50"
        />
        {measures[index]} {ingredients[index]}
      </div>
    );
  });
  return (
    <>
      <h2>Ingredienti:</h2>
      <div className="row">
        {listItems}
      </div>
    </>
  );
}
export default Ingredient;
