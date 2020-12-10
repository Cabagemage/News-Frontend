import React from "react";
import { Link, Route } from 'react-router-dom';
import "../App.css";


function Header() {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <Route path="/signup">
      <Link className="header__button" to="/signin">Авторизоваться</Link>
      </Route>
    </header>

  );
}

export default Header;
