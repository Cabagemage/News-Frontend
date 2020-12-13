import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header/Header";
import Main from "./Main"
import About from "./About"
import Footer from "./Footer"
import LoginPopup from "./LoginPopup"
import RegistrationPopup from "./RegistrationPopup"
import { Switch, NavLink, Link, Route } from 'react-router-dom';
function App() {

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleLoginPopup = () => {
    setLoginPopupOpen(true);
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
      <Switch>
        
      <Route path="/signin">
      <LoginPopup
      isOpen={isLoginPopupOpen}
      isClose={closeAllPopups}
      closeToOverlay={handleOverlayClose}>
      </LoginPopup>
      </Route>

      <Route path="/signup">
      <RegistrationPopup
      isOpen={isLoginPopupOpen}
      isClose={closeAllPopups}
      closeToOverlay={handleOverlayClose}></RegistrationPopup>
      </Route>
      </Switch>
      <About />
      <Footer />
    </body>
  );
}

export default App;
