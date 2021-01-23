import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../../hooks/useForm";
import validate from "../../utils/validators";
import { Formik, Field } from "formik";
const LoginPopup = ({
  handleFormToggle,
  handleLogin,
  isOpen,
  isClose,
  closeToOverlay,
}) => {
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const { email, password } = this.state;
  //   this.props.handleLogin(email, password);
  // }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Введите емейл";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Неправильный емейл";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 3) {
          errors.password = "Маленький пароль блядь";
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
        isValid
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
                <span className="popup__error_visible"> {errors.email && touched.email && errors.email }</span>
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
                <span className="popup__error_visible"> {errors.password && touched.password && errors.password}</span>
              </div>
            </>
          }
        />
      )}
    </Formik>
  );
};
export default LoginPopup;
// class LoginPopup extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       name: "",
//     };
//     const { values, errors, handleChange, handleSubmit } = useForm(login, validate);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(e) {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const { email, password } = this.state;
//     this.props.handleLogin(email, password);
//   }

//   render() {
//     return (
//       <PopupWithForm
//         name="login"
//         form="login"
//         title="Вход"
//         link="Зарегистрироваться"
//         buttonText="Войти"
//         btnClassName="login"
//         onSubmit={this.handleSubmit}
//         popupCloseName="login"
//         handleFormToggle={this.props.handleFormToggle}
//         isOpen={this.props.isOpen}
//         isClose={this.props.isClose}
//         closeToOverlay={this.props.closeToOverlay}
//         children={
//           <>
//             <div className="popup__inputs">
//               <label className="popup__label">Почта</label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={this.handleChange}
//                 value={this.state.email}
//                 required
//                 className="popup__input popup__input_type_link"
//                 placeholder="Введите почту"
//               />
//               <span
//                 id="avatar-error"
//                 className="popup__input_type_error"
//               ></span>
//               <label className="popup__label">Пароль</label>
//               <input
//                 type="password"
//                 name="password"
//                 onChange={this.handleChange}
//                 value={this.state.password}
//                 required
//                 className="popup__input popup__input_type_link"
//                 placeholder="Введите пароль"
//               />
//             </div>
//           </>
//         }
//       />
//     );
//   }
// }

// export default LoginPopup;
