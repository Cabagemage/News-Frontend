import React from "react";
import { NavLink, Route } from 'react-router-dom';
import "./header/header.css";
import "../../App.css";
function HeaderHamburgerSignedOut({handleLoginPopup}) {
  return (
    <div className="header__container_version_mobile">
    <nav className="header__navigation">
    <Route>
      <NavLink className="link link_theme_white"
      exact
      to="/">Главная</NavLink>
    </Route>
    </nav>
    <button
    onClick={handleLoginPopup}
    className="button button_place_loggedout button_theme_white">Авторизироваться</button>
    </div>
  );
}


export default HeaderHamburgerSignedOut;