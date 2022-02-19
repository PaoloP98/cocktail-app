/* eslint-disable max-len */
import PropTypes from "prop-types";
import React from "react";
import CocktailCard from "../../../../components/Card/CocktailCard/CocktailCard";


function CocktailsGrid(props) {
    const { cocktails, col, input } = props;

    CocktailsGrid.propTypes = {
        // l'array vuoto è identificato come object
        cocktails: PropTypes.object.isRequired,
        col: PropTypes.object.isRequired,
        input: PropTypes.string.isRequired,
    };

    let drinks = "drinks" in cocktails ? cocktails.drinks : [];
    const listItems = drinks.map((drink) => {
        return (
            <div
                key={drink.idDrink}
                className="col">
                <CocktailCard
                    imgUrl={drink.strDrinkThumb}
                    cocktailName={drink.strDrink}
                    idDrink={parseInt(drink.idDrink)}
                />
            </div>

        );
    });
    return <>
        {
            listItems.length > 0 ?
                <div
                    className={`
                row
                row-cols-${col.xs}
                row-cols-sm-${col.sm}
                row-cols-md-${col.md}
                row-cols-lg-${col.lg}
                g-4
                my-3
                `}
                >
                    {listItems}
                </div>
                :
                <p>Nessun risultato trovato per &quot;{input}&quot;...</p>
        }
    </>;
}
export default CocktailsGrid;
