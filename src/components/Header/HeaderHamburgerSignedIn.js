import React from "react";
import { NavLink, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header/header.css";
import "../../App.css";
import leaveIcon from "../../images/leave-button.svg";
function HeaderHamburgerSignedIn({signOut }) {
  const login = useSelector((state) => state.app.loggedIn);
  const curUser = useSelector((state) => state.currentUser.userInfo);
  return (
    <div className="header__container_version_mobile">
      <div className="header__wrapper">
      <nav className="header__navigation">
        <Route>
          <NavLink className="link link_theme_white" exact to="/">
            Главная
          </NavLink>
        </Route>
        {login ? (
          <NavLink className="link link_theme_white" to="/saved-news">
            Сохраненные cтатьи
          </NavLink>
        ) : null}
      </nav>
      {login ? (
        <button
          className="button button_place_loggedin button_theme_white"
          onClick={signOut}
        >
          {curUser.name}{" "}
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
    </div>
  );
}

export default HeaderHamburgerSignedIn;
