import React from "react";
import LoggedIn from './LoggedIn.js'
import IsNotLoggedIn from './IsNotLoggedIn.js'
import "./header/header.css";


function Header({isLoggedIn, handleLoginPopup}) {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <div className="header__navigation">
      {isLoggedIn ? <LoggedIn /> :
      <IsNotLoggedIn
      handleLoginPopup={handleLoginPopup}
      /> }
      </div>
    </header>

  );
}

export default Header;
