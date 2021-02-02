import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { FETCH_NEWS_CARDS } from "../redux/types";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTokenCheck,
  removeLoggedIn,
  removeToken,
  setPopupLoginOpen,
  setPopupLoginClose,
  setUserInfo,
  getSavedCards,
  startSearch,
} from "../redux/actions";

import "../App.css";
import Header from "./Header/Header";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Main from "./Main/Main";
import About from "./About/About";
import Footer from "./Footer/Footer";
import SavedNews from "./SavedNews/SavedNews";
import LoginPopup from "./PopupAuth/LoginPopup";
import Cards from "./Cards/Cards";
import InfoToolTip from "./InfoToolTip/InfoToolTip";
import RegistrationPopup from "./PopupAuth/RegistrationPopup";

function App() {
  const history = useHistory();
  const [formToggle, setFormToggle] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false); // Открытие и закрытие попапа
  const path = useLocation();
  const login = useSelector((state) => state.app.loggedIn);
  const isToken = useSelector((state) => state.app.token);
  const LoginPopupOpen = useSelector((state) => state.app.isLoginPopupOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo(isToken));
    dispatch(getSavedCards(isToken));
  }, [isToken, dispatch]);

  useEffect(() => {
    // dispatch(getKeyword(localStorage.getItem("keyword")));
    const articles = localStorage.getItem("articles")
      ? JSON.parse(localStorage.getItem("articles"))
      : [];

    if (localStorage.getItem("keyword")) {
      dispatch(startSearch());
      dispatch({ type: FETCH_NEWS_CARDS, payload: articles });
    }
  }, [dispatch]);

  const handleLoginPopup = () => {
    dispatch(setPopupLoginOpen());
  };

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
  };

  const closeAllPopups = () => {
    dispatch(setPopupLoginClose());
    setInfoPopupOpen(false);
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  function redirectToPopup() {
    const savedPath = path.pathname === "/saved-news";
    if (savedPath && !login) {
      history.push("/");
      dispatch(setPopupLoginOpen());
    }
  }

  const signOut = () => {
    dispatch(removeToken());
    dispatch(removeLoggedIn());
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    dispatch(handleTokenCheck());
    redirectToPopup();
  }, []);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div class="layout">
            <Header signOut={signOut} handleLoginPopup={handleLoginPopup} />
            <Main />
          </div>
          <Cards />
          <About />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          component={SavedNews}
          loggedIn={login}
          signOut={signOut}
        ></ProtectedRoute>
      </Switch>
      <Footer />
      <InfoToolTip
        isOpen={isInfoPopupOpen}
        handleLoginPopup={handleLoginPopup}
        isClose={closeAllPopups}
        closeToOverlay={handleOverlayClose}
      />
      {!formToggle ? (
        <LoginPopup
          isOpen={LoginPopupOpen}
          closeToOverlay={handleOverlayClose}
          toggled={formToggle}
          handleFormToggle={handleFormToggle}
          isClose={closeAllPopups}
        ></LoginPopup>
      ) : (
        <RegistrationPopup
          isOpen={LoginPopupOpen}
          closeToOverlay={handleOverlayClose}
          toggled={formToggle}
          handleFormToggle={handleFormToggle}
          isClose={closeAllPopups}
        ></RegistrationPopup>
      )}
    </div>
  );
}

export default App;
