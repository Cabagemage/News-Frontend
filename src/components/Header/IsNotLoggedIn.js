import React, {useState, useEffect} from "react";
import { NavLink, Route } from 'react-router-dom';
import "../../App.css";

function IsNotLoggedIn() {
  return (
    <>
     <Route>
      <NavLink
      className="header__link"
      activeClassName="header__link_active"
      exact
      to="/">Главная</NavLink>
    </Route>
    <Route>
      <button className="header__button" to="/signin">Авторизоваться</button>
    </Route>
    </>
  )
}

export default IsNotLoggedIn;
