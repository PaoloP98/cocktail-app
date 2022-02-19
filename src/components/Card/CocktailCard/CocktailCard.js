import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody, CardSubtitle, CardTitle
} from "reactstrap";
import { drinkDefaultImage } from "../../../_utility/_utility";
import style from "./CocktailCard.module.css";
function CocktailCard(props) {
    const {
        imgUrl,
        cocktailName,
        idDrink,
        strCategory,
        ingredients,
    } = props;

    CocktailCard.propTypes = {
        imgUrl: PropTypes.string.isRequired,
        cocktailName: PropTypes.string.isRequired,
        idDrink: PropTypes.number.isRequired,
        strCategory: PropTypes.string,
        ingredients: PropTypes.arrayOf(String),
        measures: PropTypes.arrayOf(String),
    };
    return (
        <Link
            to={`/cocktail-info/${idDrink}`}
            className={style.linkStyle}
        >
            <Card
                className={style.cocktailCard}
                title={cocktailName}
            >
                <img
                    onError={(event) => drinkDefaultImage(event)}
                    alt={cocktailName}
                    src={imgUrl}
                    width="100%"
                    height="250px"
                    loading="lazy"
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {cocktailName}
                    </CardTitle>
                    {strCategory != undefined ?
                        <CardSubtitle>{strCategory}</CardSubtitle>
                        : <></>
                    }
                    {ingredients?.length > 0 ?
                        <>
                            <hr />
                            <p className="mt-2">{ingredients.join(", ")}</p>
                        </>
                        : <></>}

                </CardBody>
            </Card>
        </Link>
    );
}
export default CocktailCard;