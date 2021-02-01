import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./header/header.css";
import "../../App.css";

function HeaderHamburgerSignedOut({ handleLoginPopup }) {
  const login = useSelector((state) => state.app.loggedIn);

  return (
    <div className="header__container_version_mobile">
      <nav className="header__navigation">
        {login ? (
          <>
            <NavLink className="link link_theme_white" exact to="/">
              Главная
            </NavLink>
            <NavLink
              className="link link_theme_white"
              activeClassName="header__link_active"
              exact
              to="/saved-news"
            >
              Сохраненные статьи
            </NavLink>
          </>
        ) : (
          <NavLink className="link link_theme_white" exact to="/">
            Главная
          </NavLink>
        )}
      </nav>
      <button
        onClick={handleLoginPopup}
        className="button button_place_loggedout button_theme_white"
      >
        Авторизироваться
      </button>
    </div>
  );
}

export default HeaderHamburgerSignedOut;
