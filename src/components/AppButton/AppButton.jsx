import React from "react";
import "./app_button.css";



const AppButton = ({disabled = false, size, text, bgColor, onBtnClick}) => {
  return (
    <div>
      <button
      onClick={onBtnClick}
        disabled={disabled}
        className={disabled ? "app-button-disabled" : `app-button ${bgColor}` }
      >
       {text.toUpperCase()}
      </button>
    </div>
  );
};

export default AppButton;
