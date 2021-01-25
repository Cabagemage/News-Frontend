import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./header/header.css";
import "../../App.css";
import leaveIcon from "../../images/leave-button.svg";
function HeaderHamburgerSignedIn({ loggedIn, name, signOut }) {
  return (
    <div className="header__container_version_mobile">
      <nav className="header__navigation">
        <Route>
          <NavLink className="link link_theme_white" exact to="/">
            Главная
          </NavLink>
        </Route>
        {loggedIn ? (
          <NavLink className="link link_theme_white" to="/saved-news">
            Сохраненные cтатьи
          </NavLink>
        ) : null}
      </nav>
      {loggedIn ? (
        <button
          className="button button_place_loggedin button_theme_white"
          onClick={signOut}
        >
          {name}{" "}
          <img
            className="icon icon_place_header"
            src={leaveIcon}
            alt="выйти"
          ></img>
        </button>
      ) : (
        <button
          className="button button_place_loggedin button_theme_white"
          onClick={signOut}
        >
          Авторизоваться{" "}
          <img
            className="icon icon_place_header"
            src={leaveIcon}
            alt="выйти"
          ></img>
        </button>
      )}
    </div>
  );
}

export default HeaderHamburgerSignedIn;
