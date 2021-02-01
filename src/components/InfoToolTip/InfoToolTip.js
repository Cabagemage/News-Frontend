import React from "react";

import "../../App.css";
import "./infotooltip/infotooltip.css";

function InfoToolTip({ handleLoginPopup, isOpen, isClose, closeToOverlay }) {
  return (
    <div
      className={`popup   popup_function_registration ${
        isOpen && "popup_opened"
      }  `}
      onClick={closeToOverlay}
    >
      <div className="popup__container ">
        <button
          type="button"
          className="popup__close"
          onClick={isClose}
        ></button>
        <h2 className="infotooltip__message">Вы успешно зарегистрировались</h2>
        <button onClick={handleLoginPopup} className="link link_style_popup">
          Войти
        </button>
      </div>
    </div>
  );
}

export default InfoToolTip;
