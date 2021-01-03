import React, { useState } from "react";
import "../../App.css";
import "./header/header.css";
import { NavLink, Route } from "react-router-dom";
import HeaderHamburgerSignedOut from "./HeaderHamburgerSignedOut";
import HeaderHamburgerSignedIn from "./HeaderHamburgerSignedIn";
import leaveIcon  from "../../images/leave-button.svg";
function Header({ loggedIn, handleLoginPopup, signOut, name }) {
  const [streamingsIsOpen, setStreamingsIsOpen] = useState(true);
  const [streamingsBtnIsClicked, setStreamingsBtnIsClicked] = useState(false);

  const handleBtnClick = () => {
    setStreamingsIsOpen(!streamingsIsOpen);
    setStreamingsBtnIsClicked(!streamingsBtnIsClicked);
  };

  return (
    <>
      {loggedIn ? (
        <header className="header header_status_savednews">
          {!streamingsBtnIsClicked ? (
            <NavLink
              to="/"
              className="link header__logo header__logo_theme_black"
            >
              NewsExplorer
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="link header__logo header__logo_theme_white"
            >
              NewsExplorer
            </NavLink>
          )}
          {streamingsBtnIsClicked ? (
            <button
              className="button header__hamburger-menu_clicked "
              onClick={handleBtnClick}
            ></button>
          ) : (
            <button
              className="button header__hamburger-menu_theme_black "
              onClick={handleBtnClick}
            ></button>
          )}
          <div className="header__container header__container_version_mobile">
            <nav className="header__navigation">
              <Route>
                <NavLink
                  className="link link_theme_black"
                  exact
                  activeClassName="link_white_active"
                  to="/"
                >
                  Главная
                </NavLink>
              </Route>
              <Route>
                <NavLink
                  className="link link_theme_black"
                  activeClassName="link_white_active"
                  to="/saved-news"
                >
                  Сохраненные cтатьи
                </NavLink>
              </Route>
            </nav>
            <button className="button button_place_loggedin button_theme_black" onClick={signOut}>
              {name} <img className="icon icon_place_header" src={leaveIcon} alt="войти"></img>
            </button>
          </div>
        </header>
      ) : (
        <header className="header header_status_main">
          <NavLink to="/" className="link header__logo">
            NewsExplorer
          </NavLink>
          {streamingsBtnIsClicked ? (
            <button
              className="button header__hamburger-menu_clicked "
              onClick={handleBtnClick}
            ></button>
          ) : (
            <button
              className="button header__hamburger-menu "
              onClick={handleBtnClick}
            ></button>
          )}

          <div className="header__container header__container_version_mobile">
            <nav className="header__navigation">
              <Route>
                <NavLink
                  className="link link_theme_white"
                  activeClassName="header__link_active"
                  exact
                  to="/"
                >
                  Главная
                </NavLink>
              </Route>
            </nav>
            <button
              type="button"
              className="button button_place_loggedout"
              onClick={handleLoginPopup}
            >
              Авторизоваться
            </button>
          </div>
        </header>
      )}
      {!loggedIn && streamingsBtnIsClicked ? (
        <HeaderHamburgerSignedOut handleLoginPopup={handleLoginPopup} />
      ) : (
        ""
      )}
      {loggedIn && streamingsBtnIsClicked ? (
        <HeaderHamburgerSignedIn handleLoginPopup={handleLoginPopup} />
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
