import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./header/header.css";
import "../../App.css";
import leaveIcon  from "../../images/leave-button.svg";
function HeaderHamburgerSignedIn() {
  return (
    <div className="header__container_version_mobile">
      <nav className="header__navigation">
        <Route>
          <NavLink className="link link_theme_white" exact to="/">
            Главная
          </NavLink>
        </Route>
        <Route>
          <NavLink className="link link_theme_white" to="/saved-news">
            Сохраненные cтатьи
          </NavLink>
        </Route>
      </nav>
      <button className="button button_place_loggedin button_theme_white">
        Грета <img className="icon icon_place_header" src={leaveIcon} alt="выйти"></img>
      </button>
    </div>
  );
}

export default HeaderHamburgerSignedIn;
