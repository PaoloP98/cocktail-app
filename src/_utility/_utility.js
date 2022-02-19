import defaultImgPlaceholder from "../assets/Images/logo.png";

export const drinkDefaultImage = (onErrorEvent) => onErrorEvent.target.src = defaultImgPlaceholder;
export const ingredientDefaultImage = (onErrorEvent) => onErrorEvent.target.src = defaultImgPlaceholder;
export const getIngredientImage = (ingredient, size) => {
    // default "" = 700x700
    let sizeString = "";
    if (size != undefined) {
        size = size.toLowerCase();
        if (size == "small") {
            // 100x100
            sizeString = "-Small";
        }
        else if (size == "medium") {
            // 350x350
            sizeString = "-Medium";
        }
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}${sizeString}.png`;
}

export const getCocktailsIngredientsAndMeasures = (cocktailData) => {
    let ingredients = [], measures = [];
    for (const key in cocktailData) {
        const value = cocktailData[key];
        if (key.startsWith("strIngredient") && value && value.trim()) {
            ingredients.push(cocktailData[key]);
        }
        if (key.startsWith("strMeasure") && value && value.trim()) {
            // rimuove trailing spaces. Le misure hanno uno spazio ' ' alla fine della stringa ottenuta
            measures.push(cocktailData[key].replace(/\s+$/, ''));
        }
    }
    const result = {
        ingredients: ingredients,
        measures: measures,
    }
    return result;
}
