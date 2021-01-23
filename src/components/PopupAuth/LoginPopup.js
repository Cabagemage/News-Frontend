import React  from "react";
import PopupWithForm from "./PopupWithForm";
import { Formik } from "formik";
const LoginPopup = ({
  handleFormToggle,
  handleLogin,
  isOpen,
  isClose,
  closeToOverlay,
}) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
          errors.password = "Минимум 3 символа";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values.email, values.password);

        setSubmitting(false);
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        dirty,
        isValid,
      }) => (
        <PopupWithForm
          name="login"
          form="login"
          dirty={dirty}
          isValid={isValid}
          title="Вход"
          buttonText="Войти"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          link="Зарегистрироваться"
          btnClassName="login"
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
                  dirty={dirty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="popup__input popup__input_type_link"
                  placeholder="Введите почту"
                />
                <span className="popup__error_visible">
                  {" "}
                  {errors.email && touched.email && errors.email}
                </span>
                <label className="popup__label">Пароль</label>
                <input
                  type="password"
                  name="password"
                  dirty={dirty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="popup__input popup__input_type_link"
                  placeholder="Введите пароль"
                />
                <span className="popup__error_visible">
                  {" "}
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
            </>
          }
        />
      )}
    </Formik>
  );
};
export default LoginPopup;
