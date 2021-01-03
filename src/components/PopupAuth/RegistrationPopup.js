import React from "react";
import PopupWithForm from "./PopupWithForm";

class  RegistrationPopup extends React.Component{
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
        const {email, password, name} = this.state;
        this.props.onRegister(email, password, name)
  }

render() {
  return (
    <PopupWithForm
      name="registration"
      form="registration"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      link="Войти"
      btnClassName="login"
      onSubmit={this.handleSubmit}
      handleFormToggle={this.props.handleFormToggle}
      popupCloseName="login"
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
            <label className="popup__label">Имя</label>
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
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
}
export default RegistrationPopup;
