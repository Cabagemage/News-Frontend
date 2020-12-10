import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import "../../App.css";

function LoggedIn() {
  return (
    <>
     <Route>
      <NavLink className="header__link"
      exact
      activeClassName="header__link_active"
      to="/">Главная</NavLink>
    </Route>
    <Route>
      <NavLink
      className="header__link"
      activeClassName="header__link_active"
      to="/articles">Сохраненные cтатьи</NavLink>
    </Route>
    <Route>
      <button className="header__button" to="/signout">Юзернейм</button>
    </Route>
    </>
  )
}

export default LoggedIn;
