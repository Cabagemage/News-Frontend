import React, {useState} from "react";
import "../App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import About from "./About/About";
import Footer from "./Footer/Footer";
import SavedNewsHeader from "./SavedNewsHeader/SavedNewsHeader";
import Cards from "./Cards/Cards";
import LoginPopup from "./PopupAuth/LoginPopup";
import RegistrationPopup from "./PopupAuth/RegistrationPopup";
import { Switch, Route } from "react-router-dom";

function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);

  const handleLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const handleLoginIn = () => {
    setLoginIn(loggedIn);
  };

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
    console.log("one two three");
  };

  const closeAllPopups = () => {
    setLoginPopupOpen(false);
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div class="layout">
            <Header handleLoginPopup={handleLoginPopup} />
            <Main />
          </div>
          <Cards loggedIn={loggedIn} />
          <About />
        </Route>

        <Route path="/saved-news">
          <Header
            loggedIn={handleLoginIn}
            handleLoginPopup={handleLoginPopup}
          />
          <SavedNewsHeader />
          <Cards loggedIn={!loggedIn} />
        </Route>
      </Switch>

      <Footer />

      {!formToggle ? (
        <LoginPopup
          isOpen={isLoginPopupOpen}
          toggled={formToggle}
          handleFormToggle={handleFormToggle}
          isClose={closeAllPopups}
          closeToOverlay={handleOverlayClose}
        ></LoginPopup>
      ) : (
        <RegistrationPopup
          isOpen={isLoginPopupOpen}
          toggled={formToggle}
          handleFormToggle={handleFormToggle}
          isClose={closeAllPopups}
          closeToOverlay={handleOverlayClose}
        ></RegistrationPopup>
      )}
    </div>
  );
}

export default App;
