import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import disco from "../../assets/Images/disco.png";
import unimib from "../../assets/Images/unimib.png";
import style from "./Footer.module.css";


function Footer(props) {
    const { courseName, courseLink, navItems } = props;

    Footer.propTypes = {
        courseName: PropTypes.string.isRequired,
        courseLink: PropTypes.string.isRequired,
        navItems: PropTypes.array.isRequired,
    };


    const itemList = navItems.map((item) => {
        return (
            <li key={item.url} className="nav-item">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? style.active : ""
                    }
                    to={item.url}>
                    {item.text}
                </NavLink>
            </li>
        )
    })

    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav className={style.footerNav}>

                            <ul className="nav flex-column">
                                {itemList}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-auto">

                        <div className={'d-flex ${style.copyright}'}>

                            <div id={style.course}>
                                <a href={courseLink} target="_blank" rel="noreferrer">
                                    {courseName}
                                </a>
                            </div>

                            <div className={style.logo}>
                                <a href="https://www.disco.unimib.it/it" target="_blank" rel="noreferrer">
                                    <img src={disco} alt="disco" />
                                </a>
                            </div>

                            <div className={style.logo}>
                                <a href="https://www.unimib.it/" target="_blank" rel="noreferrer">
                                    <img src={unimib} alt="unimib" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;