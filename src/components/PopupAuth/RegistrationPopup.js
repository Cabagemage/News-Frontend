import React from "react";
import PopupWithForm from "./PopupWithForm";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { onRegister } from "../../redux/actions";
function RegistrationPopup({
  isOpen,
  isClose,
  handleFormToggle,
  closeToOverlay,
}) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Введите корректный email";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Некорректно введён email";
        }
        if (!values.password) {
          errors.password = "Обязательное поле";
        } else if (values.password.length < 3) {
          errors.password = "Маленький пароль";
        }
        if (!values.name) {
          errors.name = "Обязательное поле";
        } else if (values.name.length < 2) {
          errors.name = "Минимум два символа";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(onRegister(values.email, values.password, values.name));
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        dirty,
        isValid,
      }) => (
        <PopupWithForm
          name="registration"
          handleReset={handleReset}
          form="registration"
          title="Регистрация"
          buttonText="Зарегистрироваться"
          link="Войти"
          dirty={dirty}
          isValid={isValid}
          btnClassName="login"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          handleFormToggle={handleFormToggle}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  required
                  className="popup__input popup__input_type_link"
                  placeholder="Введите почту"
                />
                <span className="popup__error_visible">
                  {errors.email && touched.email && errors.email}
                </span>
                <label className="popup__label">Пароль</label>
                <input
                  type="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  className="popup__input popup__input_type_link"
                  placeholder="Введите пароль"
                />
                <span className="popup__error_visible">
                  {errors.password && touched.password && errors.password}
                </span>
                <label className="popup__label">Имя</label>
                <input
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  className="popup__input popup__input_type_link"
                  placeholder="Введите имя"
                />
                <span className="popup__error_visible">
                  {errors.name && touched.name && errors.name}
                </span>
              </div>
            </>
          }
        />
      )}
    </Formik>
  );
}

export default RegistrationPopup;
