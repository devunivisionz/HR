import React from "react";
import "./GlobalButton.css";

const GlobalButton = ({ buttonFor, clickHandler }) => {
  return (
    <button className="global-button" onClick={clickHandler}>
      Add {buttonFor}
    </button>
  );
};

export default GlobalButton;
