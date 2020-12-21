import React from "react";
import LoggedIn from './LoggedIn.js'
import IsNotLoggedIn from './IsNotLoggedIn.js'
import "../../App.css";
import "./header/header.css";
import { NavLink, Link, Route } from 'react-router-dom';

function Header({loggedIn, handleLoginPopup}) {
  return (
    <header className="header">
      {loggedIn ?
      <NavLink to='/' className="link header__logo header__logo_theme_black">NewsExplorer</NavLink>
      : <NavLink to='/' className="link header__logo">NewsExplorer</NavLink>}
      <nav className="header__navigation">
      {loggedIn ? <LoggedIn /> :
      <IsNotLoggedIn
      handleLoginPopup={handleLoginPopup}
      /> }
      </nav>
    </header>

  );
}

export default Header;
