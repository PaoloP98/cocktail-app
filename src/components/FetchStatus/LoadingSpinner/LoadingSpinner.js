import PropTypes from "prop-types";
import React from "react";
import style from "./LoadingSpinner.module.css";

function LoadingSpinner(props) {
  const { isLoading = true } = props;
  LoadingSpinner.defaultProps = {
    isLoading: true,
  };
  LoadingSpinner.propTypes = {
    isLoading: PropTypes.bool,
  };
  if (!isLoading) {
    return (
      <></>
    );
  }
  return (
    <div className={style.lds_ring}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
export default LoadingSpinner;
