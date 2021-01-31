import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header/Header";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Main from "./Main/Main";
import About from "./About/About";
import Footer from "./Footer/Footer";
import SavedNews from "./SavedNews/SavedNews";
import LoginPopup from "./PopupAuth/LoginPopup";
import RegistrationPopup from "./PopupAuth/RegistrationPopup";
import { currentUserContext } from "../contexts/currentUserContext";
import { mainApi } from "../utils/API/MainApi";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import * as Auth from "../utils/API/Auth";
import Cards from "./Cards/Cards";
import InfoToolTip from "./InfoToolTip/InfoToolTip";
import { useSelector } from "react-redux";
function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState("");
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false); // Открытие и закрытие попапа
  const [message, setMessage] = useState(false);
  const path = useLocation();
  const news = useSelector((state) => state.news.fetchedNews);
  const loading = useSelector((state) => state.app.loading);
  const search = useSelector((state) => state.app.search);
  const login = useSelector((state) => state.app.loggedIn);
  const isToken = useSelector((state) => state.app.token);
  console.log(isToken)
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
      handleLoginPopup();
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
    setLoginPopupOpen(true);
  };

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
  };

  const closeAllPopups = () => {
    setLoginPopupOpen(false);
    setInfoPopupOpen(false);
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  async function onRegister(email, password, name) {
    try {
      const register = await Auth.register(email, password, name);
      if (register) {
        setLoginPopupOpen(false);
        setMessage(true);
        setInfoPopupOpen(true);
        history.push("/");
      }
    } catch (err) {
      if (err === 409) {
        console.log("Такой пользователь уже существует");
      }
    } finally {
    }
  }
  // const handleLogin = (email, password) => {
  //   Auth.signIn(email, password)
  //     .then((res) => {
  //       if (res && res.token) {
  //         localStorage.setItem("jwt", res.token);
  //         setLoginIn(true);
  //         setToken(res.token);
  //         history.push("/");
  //         closeAllPopups();
  //       }
  //     })
  //     .catch((error) => {
  //       if (error === 409) {
  //         console.log("Неправильная почта или пароль");
  //       } else if (error === 404) {
  //         console.log("Пользователь не найден");
  //       }
  //     });
  // };
  async function handleTokenCheck() {
    const jwt = login;
    try {
      // showLoader();
      let response = await Auth.checkToken(jwt);
      if (response) {
        setToken(jwt);
        setLoginIn(true);
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      // hideLoader();
    }
  }
  function redirectToPopup() {
    const savedPath = path.pathname === "/saved-news";
    if (savedPath && !loggedIn) {
      history.push("/");
      setLoginPopupOpen(true);
    }
  }

  const signOut = () => {
    setToken("");
    localStorage.clear();
    setLoginIn(false);
    history.push("/");
  };

  useEffect(() => {
    handleTokenCheck();

    redirectToPopup();
  }, []);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <div class="layout">
              <Header
                loggedIn={login}
                signOut={signOut}
                handleLoginPopup={handleLoginPopup}
              />
              <Main keyword={keyword} setKeyword={setKeyword} />
            </div>
            <Cards
              savedCards={savedCards}
              keyword={keyword}
              handleSaveCard={handleSaveCard}
              handleDeleteCard={handleDeleteCard}
              loggedIn={login}
            />
            <About />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            keyword={keyword}
            cards={cards}
            handleDeleteCard={handleDeleteCard}
            loggedIn={login}
            savedCards={savedCards}
            signOut={signOut}
          ></ProtectedRoute>
        </Switch>
        <Footer />

        <InfoToolTip
          isOpen={isInfoPopupOpen}
          setMessage={message}
          handleLoginPopup={handleLoginPopup}
          isClose={closeAllPopups}
          closeToOverlay={handleOverlayClose}
        />

        {!formToggle ? (
          <LoginPopup
            isOpen={isLoginPopupOpen}
            closeToOverlay={handleOverlayClose}
            toggled={formToggle}
            handleFormToggle={handleFormToggle}
            isClose={closeAllPopups}
          ></LoginPopup>
        ) : (
          <RegistrationPopup
            isOpen={isLoginPopupOpen}
            onRegister={onRegister}
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
