import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header/Header";
import Main from "./Main"
import About from "./About"
import Footer from "./Footer"
import Cards from "./Cards"
import LoginPopup from "./LoginPopup"
import RegistrationPopup from "./RegistrationPopup"
import { Switch, NavLink, Link, Route } from 'react-router-dom';
function App() {

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [formToggle, setFormToggle] = useState(false)

  const handleLoginPopup = () => {
    setLoginPopupOpen(true);
  };

 const handleFormToggle = () => {
    setFormToggle(!formToggle);
    console.log('one two three')
  };

  const closeAllPopups = () => {
    setLoginPopupOpen(false)
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  return (
    <body className="body">
      <div className="layout">
      <Header handleLoginPopup={handleLoginPopup} />
      <Main />
      </div>
      {!formToggle ?
      <LoginPopup
      isOpen={isLoginPopupOpen}
      toggled={formToggle}
      handleFormToggle={handleFormToggle}
      isClose={closeAllPopups}
      closeToOverlay={handleOverlayClose}>
      </LoginPopup> :
      <RegistrationPopup
      isOpen={isLoginPopupOpen}
      toggled={formToggle}
      handleFormToggle={handleFormToggle}
      isClose={closeAllPopups}
      closeToOverlay={handleOverlayClose}>
      </RegistrationPopup> }
      <Cards />
      <About />
      <Footer />
    </body>
  );
}

export default App;
