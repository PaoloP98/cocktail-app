import PropTypes from "prop-types";
import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
function CocktailBreadcrumb(props) {
    const { strDrink, strCategory } = props;
    const { pathname } = useLocation();
    
    CocktailBreadcrumb.propTypes = {
        strDrink: PropTypes.string,
        strCategory: PropTypes.string,
    };

    let cocktailBreadcrumb = <></>;
    let cocktailInfoBreadcrumb = <></>;
    let cocktailCategoryBreadcrumb = <></>;

    const isCocktailPath = matchPath({ path: "/cocktails/" }, pathname);
    const isCocktailCategoryPath = matchPath({ path: "/cocktails/:string" }, pathname);
    const isCocktailInfoPath = matchPath({ path: "/cocktail-info/:id" }, pathname);

    if (isCocktailPath) {
        cocktailBreadcrumb = <BreadcrumbItem
            active
            href="/cocktails"
            tag="a"
        >
            Cocktails
        </BreadcrumbItem>;
    }

    if (isCocktailCategoryPath) {
        cocktailBreadcrumb = <BreadcrumbItem
            href="/cocktails"
            tag="a"
        >
            Cocktails
        </BreadcrumbItem>;
        cocktailCategoryBreadcrumb = 
        <BreadcrumbItem
            active
            href={"/cocktails/" + strCategory}
            tag="a"
        >
            {strCategory}
        </BreadcrumbItem>;
    }

    if (isCocktailInfoPath) {
        cocktailBreadcrumb = <BreadcrumbItem
            href="/cocktails"
            tag="a"
        >
            Cocktails
        </BreadcrumbItem>;
        cocktailCategoryBreadcrumb = <BreadcrumbItem
            href={"/cocktails/" + strCategory}
            tag="a"
        >
            {strCategory}
        </BreadcrumbItem>;
        cocktailInfoBreadcrumb = <BreadcrumbItem
            active
            tag="span"
        >
            {strDrink}
        </BreadcrumbItem>;
    }

    return (
        <div>
            <Breadcrumb listTag="div">
                {cocktailBreadcrumb}
                {cocktailCategoryBreadcrumb}
                {cocktailInfoBreadcrumb}
            </Breadcrumb>
        </div>
    );

}
export default CocktailBreadcrumb;