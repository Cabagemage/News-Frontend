import React, {useState, useEffect} from "react";
import { NavLink, Link, Route } from 'react-router-dom';
import "./header/header.css";
import "../../App.css";
function IsNotLoggedIn({handleLoginPopup}) {
  return (
    <>
     <Route>
      <NavLink
      className="link link_theme_white"
      activeClassName="header__link_active"
      exact
      to="/">Главная</NavLink>
    </Route>
      <button
      type="button"
      className="button button_place_loggedout"
      onClick={handleLoginPopup}>Авторизоваться
      </button>
    </>
  )
}

export default IsNotLoggedIn;
