import React from "react";
import PopupWithForm from "./PopupWithForm";

function RegistrationPopup({
  isOpen,
  isClose,
  closeToOverlay,
  formToggle
}) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm
      name="login"
      form="login"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      btnClassName="login"
      onSubmit={handleSubmit}
      popupCloseName="login"
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
            <label className="popup__label">Имя</label>
            <input
              name="email"
              required
              className="popup__input popup__input_type_link"
              placeholder="Введите имя"
            />
          </div>
        </>
      }
    />
  );
}


export default RegistrationPopup;