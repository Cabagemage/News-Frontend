import React, { useState, useEffect, Suspense, lazy } from "react";
import "../App.css";
import Header from "./Header/Header";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Main from "./Main/Main";
import About from "./About/About";
import Footer from "./Footer/Footer";
import SavedNewsHeader from "./SavedNewsHeader/SavedNewsHeader";
import LoginPopup from "./PopupAuth/LoginPopup";
import RegistrationPopup from "./PopupAuth/RegistrationPopup";
import { currentUserContext } from "../contexts/currentUserContext";
import { apiProfile } from "../utils/Api";
import { mainApi } from "../utils/MainApi";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import * as Auth from "../utils/Auth";
import Preloader from "./Preloader/Preloader";
const Cards = lazy(() => import("./Cards/Cards"));

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [load, setLoader] = useState(null);
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [cards, setCards] = useState(null);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState("");
  const [isSave, setSave] = useState(null);
  const [isSearch, setSearch] = useState(false);

  useEffect(() => {
    mainApi
      .getOwnerInfo(token)
      .then((res) => {
        setName(res.name);
      })
      .then(() => {
        mainApi
          .getSavedCards(token)
          .then((res) => {
            setSavedCards(res.date);
            console.log(res.date);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [cards, token]);

  // Эта функция выводит список карточек по ключевому слову.
  const handleGetCards = () => {
    apiProfile.getCards(keyword).then((cards) => {
      setCards([...cards.articles]);
      console.log([...cards.articles]);
      setSearch(true);
      return;
    });
  };

  const handleSaveCard = (data) => {
    mainApi
      .addNewCard(data, token)
      .then((res) => {
        console.log(token)
        setSavedCards([...savedCards, res]);
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
    console.log("one two three");
  };

  const closeAllPopups = () => {
    setLoginPopupOpen(false);
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
        savedCards,
        token,
        keyword,
        setKeyword,
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
              <Suspense fallback={<Preloader />}>
                <Cards
                  savedCards={savedCards}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              </Suspense>
            ) : null}
            <About />
            {/* <ProtectedRoute
          path="/saved-news"
          login={loggedIn}
          component={SavedNewsHeader}
          cards={cards}

          ></ProtectedRoute> */}
          </Route>

          <Route path="/saved-news">
            <Header
              loggedIn={handleLoginIn}
              signOut={signOut}
              name={name}
              handleLoginPopup={handleLoginPopup}
            />
            <SavedNewsHeader />
            {isSearch ? (
              <Suspense fallback={<Preloader />}>
                <Cards
                  cards={cards}
                  savedCards={savedCards}
                  loggedIn={!loggedIn}
                />
              </Suspense>
            ) : null}
          </Route>
        </Switch>

        <Footer />

        {!formToggle ? (
          <LoginPopup
            isOpen={isLoginPopupOpen}
            toggled={formToggle}
            handleLogin={handleLogin}
            handleFormToggle={handleFormToggle}
            isClose={closeAllPopups}
          ></LoginPopup>
        ) : (
          <RegistrationPopup
            isOpen={isLoginPopupOpen}
            onRegister={onRegister}
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
