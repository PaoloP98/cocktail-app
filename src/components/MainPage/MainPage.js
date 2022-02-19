import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./MainPage.module.css";
function MainPage(props) {
  const {
    children,
    footerCourseName,
    footerCourseLink,
    navItems,
    logo,
  } = props;

  MainPage.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    logo: PropTypes.string.isRequired,
    navItems: PropTypes.array,
    footerCourseName: PropTypes.string.isRequired,
    footerCourseLink: PropTypes.string.isRequired,
  };
  return (
    <>
      <Header
        navItems={navItems}
        logo={logo}
      />
      <Container>
        <div className={style.page_body}>
          {children}
        </div>
      </Container>

       <Footer
        logo={logo}
        navItems={navItems}
        courseName={footerCourseName}
        courseLink={footerCourseLink}
      /> 
    </>
  );
}
export default MainPage;
