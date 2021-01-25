import React, { useState, useContext } from "react";
import "../../App.css";
import "./header/header.css";
import { NavLink, Route, Switch } from "react-router-dom";
import HeaderHamburgerSignedOut from "./HeaderHamburgerSignedOut";
import HeaderHamburgerSignedIn from "./HeaderHamburgerSignedIn";
import leaveIcon from "../../images/leave-button.svg";
import { currentUserContext } from "../../contexts/currentUserContext";

function Header({ loggedIn, handleLoginPopup, signOut }) {
  const [streamingsIsOpen, setStreamingsIsOpen] = useState(true);
  const [streamingsBtnIsClicked, setStreamingsBtnIsClicked] = useState(false);
  const handleBtnClick = () => {
    setStreamingsIsOpen(!streamingsIsOpen);
    setStreamingsBtnIsClicked(!streamingsBtnIsClicked);
  };
  const currentUser = useContext(currentUserContext);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <header className="header header_status_main">
            <NavLink
              to="/"
              className="link header__logo header__logo_theme_white"
            >
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
                  {loggedIn ? (
                    <NavLink
                      className="link link_theme_white"
                      activeClassName="header__link_active"
                      exact
                      to="/saved-news"
                    >
                      Сохраненные cтатьи
                    </NavLink>
                  ) : null}
                </Route>
              </nav>
              {!loggedIn ? (
                <button
                  type="button"
                  className="button button_place_loggedout"
                  onClick={handleLoginPopup}
                >
                  Авторизоваться
                </button>
              ) : (
                <button
                  className="button button_place_loggedout"
                  onClick={signOut}
                >
                  {currentUser.name}{" "}
                  <img
                    className="icon icon_place_header"
                    src={leaveIcon}
                    alt="войти"
                  ></img>
                </button>
              )}
            </div>
          </header>
          {!loggedIn && streamingsBtnIsClicked ? (
            <HeaderHamburgerSignedOut handleLoginPopup={handleLoginPopup} />
          ) : (
            ""
          )}
          {loggedIn && streamingsBtnIsClicked ? (
            <HeaderHamburgerSignedIn
              loggedIn={loggedIn}
              name={currentUser.name}
              signOut={signOut}
              handleLoginPopup={handleLoginPopup}
            />
          ) : (
            ""
          )}
        </Route>
        <Route path="/saved-news">
          <header className="header header_status_savednews">
            {streamingsBtnIsClicked ? (
              <NavLink
                to="/"
                className="link header__logo header__logo_theme_white"
              >
                NewsExplorer
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className="link header__logo header__logo_theme_black"
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
                <NavLink
                  className="link link_theme_black"
                  activeClassName="link_white_active"
                  exact
                  to="/"
                >
                  Главная
                </NavLink>

                <NavLink
                  className="link link_theme_black"
                  activeClassName="link_white_active"
                  to="/saved-news"
                >
                  Сохраненные статьи
                </NavLink>
              </nav>
              <button
                className="button button_place_loggedin button_theme_black"
                onClick={signOut}
              >
                {currentUser.name}{" "}
                <img
                  className="icon icon_place_header"
                  src={leaveIcon}
                  alt="войти"
                ></img>
              </button>
            </div>
          </header>
          {!loggedIn && streamingsBtnIsClicked ? (
            <HeaderHamburgerSignedOut handleLoginPopup={handleLoginPopup} />
          ) : (
            ""
          )}
          {loggedIn && streamingsBtnIsClicked ? (
            <HeaderHamburgerSignedIn
              loggedIn={loggedIn}
              name={currentUser.name}
              signOut={signOut}
              handleLoginPopup={handleLoginPopup}
            />
          ) : (
            ""
          )}
        </Route>
        )
      </Switch>
    </>
  );
}

export default Header;
