import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import "../../App.css";
import "./header/header.css";
function LoggedIn() {
  return (
    <>
     <Route>
      <NavLink className="link link_theme_black"
      exact
      activeClassName="link_white_active"
      to="/">Главная</NavLink>
    </Route>
    <Route>
      <NavLink
      className="link link_theme_black"
      activeClassName="link_white_active"
      to="/saved-news">Сохраненные cтатьи</NavLink>
    </Route>
      <button className="button button_place_loggedin button_theme_black">Грета</button>
    </>
  )
}

export default LoggedIn;
