import React, { useState, useEffect } from "react";
import { currentUserContext } from "../contexts/currentUserContext";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTokenCheck,
  removeLoggedIn,
  removeToken,
  setPopupLoginOpen,
  setPopupLoginClose,
} from "../redux/actions";

import { mainApi } from "../utils/API/MainApi";
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
  const [currentUser, setCurrentUser] = useState({});
  const [formToggle, setFormToggle] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false); // Открытие и закрытие попапа
  const path = useLocation();
  const news = useSelector((state) => state.news.fetchedNews);
  const savedNews = useSelector((state) => state.news.savedNews);
  const login = useSelector((state) => state.app.loggedIn);
  const isToken = useSelector((state) => state.app.token);
  const LoginPopupOpen = useSelector((state) => state.app.isLoginPopupOpen);
  const dispatch = useDispatch();
  console.log(isToken);

  useEffect(() => {
    mainApi
      .getOwnerInfo(isToken)
      .then((res) => {
        setCurrentUser(res);
        if (!res) {
          setCurrentUser(null);
        }
      })
      .then(() => {
        mainApi.getSavedCards(isToken).then((res) => {
          setSavedCards(res.date);
          if (!res.date) {
            setSavedCards([]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isToken]);

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
    const articles = localStorage.getItem("articles")
      ? JSON.parse(localStorage.getItem("articles"))
      : [];
    if (localStorage.getItem("keyword")) {
      // setSearch(true);
      setCards(articles);
    }
  }, [setKeyword]);

  const handleSaveCard = ({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  }) => {
    if (!login) {
      dispatch(setPopupLoginOpen());
    }
    mainApi
      .addNewCard(isToken, {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner,
      })
      .then((res) => {
        const newCards = news.map((card) => {
          if (card.url === res.link) {
            return { ...card, id: res._id, owner: res.owner };
          }
          return card;
        });
        setCards(newCards);
        setSavedCards([...savedCards, res]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (id) => {
    if (!login) {
      handleLoginPopup();
    }
    mainApi
      .deleteThisCard(isToken, id)
      .then(() => {
        const newCards = savedCards.filter((item) => item._id !== id);
        setSavedCards(newCards);
      })
      .catch((err) => console.log(err));
  };

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
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <div class="layout">
              <Header signOut={signOut} handleLoginPopup={handleLoginPopup} />
              <Main keyword={keyword} setKeyword={setKeyword} />
            </div>
            <Cards
              savedCards={savedCards}
              keyword={keyword}
              handleSaveCard={handleSaveCard}
              handleDeleteCard={handleDeleteCard}
            />
            <About />
          </Route>

          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            keyword={keyword}
            handleDeleteCard={handleDeleteCard}
            loggedIn={login}
            savedCards={savedCards}
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
    </currentUserContext.Provider>
  );
}

export default App;
