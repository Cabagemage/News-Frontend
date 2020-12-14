import React from "react";
import LoginPopup from './LoginPopup'
import RegistrationPopup from './RegistrationPopup'
const PopupStatus = ({ onClick, handleFormToggle }) =>
  <button className="link link_style_popup" onClick={onClick}>
    {handleFormToggle ? <LoginPopup /> : <RegistrationPopup />}
  </button>

export default PopupStatus;
