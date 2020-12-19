import React from "react";
import PopupWithForm from "./PopupWithForm";

function LoginPopup({
  isOpen,
  isClose,
  closeToOverlay,
  handleFormToggle,
}) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      name="login"
      form="login"
      title="Вход"
      link="Зарегистрироваться"
      buttonText="Войти"
      btnClassName="login"
      onSubmit={handleSubmit}
      popupCloseName="login"
      handleFormToggle={handleFormToggle}
      isOpen={isOpen}
      isClose={isClose}
      closeToOverlay={closeToOverlay}
      children={
        <>
          <div className="popup__inputs">
            <label className="popup__label">Почта</label>
            <input
              type="email"
              name="email"
              required
              className="popup__input popup__input_type_link"
              placeholder="Введите почту"
            />
            <span id="avatar-error" className="popup__input_type_error"></span>
            <label className="popup__label">Пароль</label>
            <input
              type="password"
              name="password"
              required
              className="popup__input popup__input_type_link"
              placeholder="Введите пароль"
            />
          </div>
        </>
      }
    />
  );
}


export default LoginPopup;