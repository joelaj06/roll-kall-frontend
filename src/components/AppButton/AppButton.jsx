import React from "react";
import "./app_button.css";



const AppButton = ({disabled = false, size = '', text, bgColor, onBtnClick}) => {
  return (
    <>
      <button
      onClick={onBtnClick}
        disabled={disabled}
        className={disabled ? "app-button-disabled" : `app-button ${bgColor} ${size}` }
      >
       {text.toUpperCase()}
      </button>
    </>
  );
};

export default AppButton;
