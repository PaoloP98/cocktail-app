/* eslint-disable max-len */
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { drinkDefaultImage } from "../../../../_utility/_utility";


function CocktailsTable(props) {
    const { cocktails } = props;
    let navigate = useNavigate();

    CocktailsTable.propTypes = {
        // l'array vuoto è identificato come object
        cocktails: PropTypes.object.isRequired,
    };

    let drinks = "drinks" in cocktails ? cocktails.drinks : [];
    const trStyle = {
        cursor: 'pointer',
      };
      
    const listItems = drinks.map((drink) => {
        return (
            <tr 
                key={drink.idDrink}
                onClick={(e) => navigate(`/cocktail-info/${drink.idDrink}`)}
                style={trStyle}
                title={drink.strDrink}
            >
                <td scope="row">{drink.idDrink}</td>
                <td>
                    <img
                        src={drink.strDrinkThumb}
                        onError={(event) => drinkDefaultImage(event)}
                        alt={drink.strDrink}
                        loading="lazy"
                        height="100"
                    />
                </td>
                <td>
                    {drink.strDrink}
                </td>
            </tr>
        );
    });
    return <>
        {listItems.length > 0 ?
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Drink</th>
                            <th scope="col">Immagine</th>
                            <th scope="col">Nome drink</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>

            </>
            :
            <p>Nessun risultato trovato per &quot;{input}&quot;...</p>
        }


    </>;
}
export default CocktailsTable;
