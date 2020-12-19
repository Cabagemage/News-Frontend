import React from "react";
import LoggedIn from './LoggedIn.js'
import IsNotLoggedIn from './IsNotLoggedIn.js'
import "../../App.css";
import "./header/header.css";

function Header({loggedIn, handleLoginPopup}) {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <div className="header__navigation">
      {loggedIn ? <LoggedIn /> :
      <IsNotLoggedIn
      handleLoginPopup={handleLoginPopup}
      /> }
      </div>
    </header>

  );
}

export default Header;
