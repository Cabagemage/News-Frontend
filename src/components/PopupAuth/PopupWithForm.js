import React from "react";
import "../../App.css";

function PopupWithForm({
  isOpen,
  isClose,
  onSubmit,
  btnClassName,
  name,
  link,
  form,
  title,
  toggled,
  buttonText,
  children,
  closeToOverlay,
  handleFormToggle,
}) {


  return (
    <div
      className={`popup ${isOpen && "popup_opened"}   popup_function_${name}  `}
      onClick={closeToOverlay}
    >
      <form className={`popup__form popup__form_function_${form}`}>
        <div id="form" className="popup__container">
          <button
            type="button"
            onClick={isClose}
            className={`popup__close popup_close_${name}`}
          ></button>
          <h2 className="popup__login">{title}</h2>
          {children}
          <button
            type="submit"
            onClick={onSubmit}
            className={`popup__save popup__save_function_${btnClassName}`}
          >
            {buttonText}
          </button>
          {toggled ? (
            <span className="popup__span">
              {" "}
              или &nbsp;
              <button
                onClick={handleFormToggle}
                className="link link_style_popup"
              >
                {link}
              </button>
            </span>
          ) : (
            <span className="popup__span">
              {" "}
              или &nbsp;
              <button
                onClick={handleFormToggle}
                className="link link_style_popup"
              >
                {link}
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default PopupWithForm;
