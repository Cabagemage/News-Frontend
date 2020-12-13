import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import "../../App.css";

function LoggedIn() {
  return (
    <>
     <Route>
      <NavLink className="link link_theme_black"
      exact
      activeClassName="link_active"
      to="/">Главная</NavLink>
    </Route>
    <Route>
      <NavLink
      className="link link_theme_black"
      activeClassName="link_active"
      to="/articles">Сохраненные cтатьи</NavLink>
    </Route>
      <button className="header__button">Юзернейм</button>
    </>
  )
}

export default LoggedIn;
