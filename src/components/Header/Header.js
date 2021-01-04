import React, { useState } from "react";
import "../../App.css";
import "./header/header.css";
import { NavLink, Route, Switch } from "react-router-dom";
import currentThemeContext from '../../contexts/currentThemeContext'
import HeaderHamburgerSignedOut from "./HeaderHamburgerSignedOut";
import HeaderHamburgerSignedIn from "./HeaderHamburgerSignedIn";
import leaveIcon  from "../../images/leave-button.svg";
function Header({ loggedIn, handleLoginPopup, signOut, name }) {
  const [streamingsIsOpen, setStreamingsIsOpen] = useState(true);
  const [streamingsBtnIsClicked, setStreamingsBtnIsClicked] = useState(false);
  const [currentTheme, setCurrentTheme] = useState();


  const handleBtnClick = () => {
    setStreamingsIsOpen(!streamingsIsOpen);
    setStreamingsBtnIsClicked(!streamingsBtnIsClicked);
  };
  const changeCurrentTheme = () => {
    setCurrentTheme(!currentTheme);
  }
  return (
    <>
    <Switch>
      <Route exact path="/">
      <header className="header header_status_main">
          <NavLink to="/" className="link header__logo header__logo_theme_white">
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
                {loggedIn ?  <NavLink
                  className="link link_theme_white"
                  activeClassName="header__link_active"
                  exact
                  to="/saved-news"
                >
                  Сохраненные cтатьи
                </NavLink> : null}
              </Route>
            </nav>
            {!loggedIn ?
                 <button
                 type="button"
                 className="button button_place_loggedout"
                 onClick={handleLoginPopup}
               >
                 Авторизоваться
               </button> :  <button className="button button_place_loggedin button_theme_black" onClick={signOut}>
              {name} <img className="icon icon_place_header" src={leaveIcon} alt="войти"></img>
            </button>}
          </div>
        </header>
        {!loggedIn && streamingsBtnIsClicked ? (
        <HeaderHamburgerSignedOut handleLoginPopup={handleLoginPopup} />
      ) : (
        ""
      )}
      {loggedIn && streamingsBtnIsClicked ? (
        <HeaderHamburgerSignedIn loggedIn={loggedIn} name={name} signOut={signOut} handleLoginPopup={handleLoginPopup} />
      ) : (
        ""
      )}
      </Route>
      <Route exact path="/saved-news">
      <header className="header header_status_savednews">
          <NavLink to="/" className="link header__logo header__logo_theme_black">
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
                  className="link link_theme_black"
                  activeClassName="link_black_active"
                  exact
                  to="/"
                >
                  Главная
                </NavLink>
                <NavLink
                  className="link link_theme_black"
                  activeClassName="link"
                  to="/saved-news"
                >
                  Сохраненные статьи
                </NavLink>
              </Route>
            </nav>
            <button className="button button_place_loggedin button_theme_black" onClick={signOut}>
              {name} <img className="icon icon_place_header" src={leaveIcon} alt="войти"></img>
            </button>
          </div>
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
        </header>
      </Route>
      )

      </Switch>
    </>
  );
}

export default Header;
