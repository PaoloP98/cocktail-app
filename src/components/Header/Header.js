import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse, Nav,
  Navbar,
  NavbarBrand, NavbarToggler, NavItem
} from "reactstrap";
import style from "./Header.module.css";

function Header(props) {
  const { logo, navItems } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  Header.propTypes = {
    logo: PropTypes.string.isRequired,
    navItems: PropTypes.array,
  };
  

  const itemList = navItems.map((item) => {
    return (
      <NavItem key={item.url} className={style.navItem}>
        <NavLink
          // exact = {item.exact}
          className={({ isActive }) =>
            isActive ? "nav-link " + style.active : "nav-link"
          }
          to={item.url}
        >
          {item.text}
        </NavLink>
      </NavItem>
  );
        });

  return (
    <>
      <Navbar
      color="dark"
      expand="md"
      dark
      className={style.navbar}
      >
        <NavbarBrand href="/" className={style.navbarBrand}>
          <img
            className={style.so}
            src={logo}
            alt="Easy bar logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="me-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="me-auto"
            navbar>
            {itemList}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}
export default Header;
