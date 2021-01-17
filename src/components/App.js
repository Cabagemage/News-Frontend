import React, { useState, useEffect, Suspense, lazy } from "react";
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
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import * as Auth from "../utils/Auth";
import Preloader from "./Preloader/Preloader";
import Cards from "./Cards/Cards";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [load, setLoader] = useState(null);
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);
  const [savedCards, setSavedCards] = useState(null)
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState("");
  const [isSave, setSave] = useState(null);
  const [isSearch, setSearch] = useState(false);
  const path = useLocation();
  const savedCardsPath = path.pathname === "/saved-news";
  useEffect(() => {
    mainApi
      .getOwnerInfo(token)
      .then((res) => {
        setName(res.name);
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
  const handleGetCards = () => {
    newsProfile
      .getCards(keyword)
      .then((res) => {
        setCards([...res.articles]);
        setSearch(true);
        if (keyword === "") {
          setCards([]);
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveCard = ({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) => {
    mainApi
      .addNewCard(token, { keyword, title, text, date, source, link, image })
      .then((res) => {
        console.log(token);
        const newCards = cards.map((card) => {
          if (card.url === res.link) {
            return { ...card, id: res._id };
          }
          return card;
        });
        setCards(newCards);
        setSavedCards([...savedCards, res]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (id) => {
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

  const handleLoginIn = () => {
    setLoginIn(loggedIn);
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
          //  Поменял ('jwt', token) на текущий вариант
          localStorage.setItem("jwt", res.token);
          setLoginIn(true);
          setToken(res.token);
          setName(res.name);
          history.push("/");
          closeAllPopups();
        }
      })
      .catch((error) => {
        // setInfoPopup(false)
        // onInfoPopup()
        if (error === 401) {
          console.log("Пользователь с email не найден");
        } else if (error === 400) {
          console.log("Не передано одно из полей ");
        }
      });
  };

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setToken(jwt);
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoginIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoginIn(false);
    history.push("/");
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <currentUserContext.Provider
      value={{
        signOut,
        token,
        keyword,
        setKeyword,
        handleDeleteCard,
        handleSaveCard,
        handleLogin,
        handleGetCards,
        name,
        loggedIn,
      }}
    >
      <div className="page">
        <Switch>
          <Route exact path="/">
            <div class="layout">
              <Header
                loggedIn={loggedIn}
                signOut={signOut}
                name={name}
                handleLoginPopup={handleLoginPopup}
              />
              <Main />
            </div>
            {isSearch ? (
              <Cards
                savedCards={savedCards}
                cards={cards}
                handleDeleteCard={handleDeleteCard}
                loggedIn={loggedIn}
              />
            ) : null}
            <About />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            cards={cards}
            handleDeleteCard={handleDeleteCard}
            loggedIn={loggedIn}
            savedCards={savedCards}
            signOut={signOut}
            name={name}
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
