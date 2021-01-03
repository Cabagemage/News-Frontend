import React from "react";
import PopupWithForm from "./PopupWithForm";

class  LoginPopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
        e.preventDefault()
        const {email, password} = this.state;
        this.props.handleLogin(email, password)
  }

render() {
  return (
    <PopupWithForm
      name="login"
      form="login"
      title="Вход"
      link="Зарегистрироваться"
      buttonText="Войти"
      btnClassName="login"
      onSubmit={this.handleSubmit}
      popupCloseName="login"
      handleFormToggle={this.props.handleFormToggle}
      isOpen={this.props.isOpen}
      isClose={this.props.isClose}
      closeToOverlay={this.props.closeToOverlay}
      children={
        <>
          <div className="popup__inputs">
            <label className="popup__label">Почта</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
              className="popup__input popup__input_type_link"
              placeholder="Введите почту"
            />
            <span id="avatar-error" className="popup__input_type_error"></span>
            <label className="popup__label">Пароль</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
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
}

export default LoginPopup;
