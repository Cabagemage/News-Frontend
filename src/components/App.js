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
import { newsProfile } from "../utils/NewsApi";
import { mainApi } from "../utils/MainApi";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import * as Auth from "../utils/Auth";
import UsePreloader from "../hooks/UsePreloader.js";
import Cards from "./Cards/Cards";

function App() {
  const [Loader, showLoader, hideLoader] = UsePreloader();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState("");
  const [isSearch, setSearch] = useState(false);
  const path = useLocation();

  useEffect(() => {
    mainApi
      .getOwnerInfo(token)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        mainApi.getSavedCards(token).then((res) => {
          setSavedCards(res.date);
          if (!res.date) {
            setSavedCards([]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  // Эта функция выводит список карточек по ключевому слову.
  async function handleGetCards() {
    try {
      showLoader();
      let response = await newsProfile.getCards(keyword);
      let getCards = await response.articles;
      setCards([...getCards]);
      setSearch(true);
      localStorage.setItem("keyword", keyword);
      localStorage.setItem("articles", JSON.stringify(getCards));
    } catch (e) {
      console.log(e);
    } finally {
      hideLoader();
    }
  }
  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
    const articles = localStorage.getItem("articles")
      ? JSON.parse(localStorage.getItem("articles"))
      : [];
    if (localStorage.getItem("keyword")) {
      setSearch(true);
      setCards(articles);
    }
  }, []);
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
    if (!loggedIn) {
      handleLoginPopup();
    }
    mainApi
      .addNewCard(token, {
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
        const newCards = cards.map((card) => {
          if (card.url === res.link) {
            return { ...card, id: res._id, owner: res.owner };
          }
          return card;
        });
        setCards(newCards);
        //  localStorage.setItem("articles", [...newCards]);
        setSavedCards([...savedCards, res]);
        console.log([...savedCards]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (id) => {
    if (!loggedIn) {
      handleLoginPopup();
    }
    mainApi
      .deleteThisCard(token, id)
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
  };

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  // Authorization
  const onRegister = (email, password, name) => {
    Auth.register(email, password, name)
      .then((res) => {
        if (res) {
          history.push("/"); // Прокинуть юзера на страницу логина
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("Некорректно заполнено одно из полей ");
        }
      });
  };
  // Регистрация работает
  const handleLogin = (email, password) => {
    Auth.signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setLoginIn(true);
          setToken(res.token);
          history.push("/");
          closeAllPopups();
        }
      })
      .catch((error) => {
        if (error === 401) {
          console.log("Пользователь с email не найден");
        } else if (error === 400) {
          console.log("Не передано одно из полей ");
        }
      });
  };
  async function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    try {
      showLoader();
      let response = await Auth.checkToken(jwt);
      if (response) {
        setToken(jwt);
        setLoginIn(true);
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoginPopupOpen(false);
      hideLoader();
    }
  }
  function redirectToPopup() {
    const savedPath = path.pathname === "/saved-news";
    if (savedPath && !loggedIn) {
      history.push("/");
      handleLoginPopup();
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
                loggedIn={loggedIn}
                signOut={signOut}
                handleLoginPopup={handleLoginPopup}
              />
              <Main
                keyword={keyword}
                setKeyword={setKeyword}
                handleGetCards={handleGetCards}
              />
            </div>
            {Loader}
            {isSearch && !Loader ? (
              <Cards
                savedCards={savedCards}
                cards={cards}
                keyword={keyword}
                handleSaveCard={handleSaveCard}
                handleDeleteCard={handleDeleteCard}
                loggedIn={loggedIn}
              />
            ) : null}

            <About />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            keyword={keyword}
            cards={cards}
            handleDeleteCard={handleDeleteCard}
            loggedIn={loggedIn}
            savedCards={savedCards}
            signOut={signOut}
          ></ProtectedRoute>
        </Switch>

        <Footer />

        {!formToggle ? (
          <LoginPopup
            isOpen={isLoginPopupOpen}
            closeToOverlay={handleOverlayClose}
            toggled={formToggle}
            handleLogin={handleLogin}
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
