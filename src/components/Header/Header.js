import React from "react";
import LoggedIn from './LoggedIn.js'
import IsNotLoggedIn from './IsNotLoggedIn.js'
import "../../App.css";
import "./header/header.css";
import { NavLink, Link, Route } from 'react-router-dom';

function Header({loggedIn, handleLoginPopup}) {
  return (
    <>
    {loggedIn ? <header className="header header_status_savednews">
    <NavLink to='/' className="link header__logo header__logo_theme_black">NewsExplorer</NavLink>
    <nav className="header__navigation">
    <LoggedIn />
    </nav>
    </header> :
    <header className="header header_status_main">
    <NavLink to='/' className="link header__logo">NewsExplorer</NavLink>
    <nav className="header__navigation">
    <IsNotLoggedIn
      handleLoginPopup={handleLoginPopup}
      />
    </nav>
    </header>}
</>
  );
}

export default Header;
