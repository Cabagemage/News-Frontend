import React, {useState, useEffect, Suspense, lazy} from "react";
import "../App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import About from "./About/About";
import Footer from "./Footer/Footer";
import SavedNewsHeader from "./SavedNewsHeader/SavedNewsHeader";
import LoginPopup from "./PopupAuth/LoginPopup";
import RegistrationPopup from "./PopupAuth/RegistrationPopup";
import { apiProfile } from '../utils/Api'
import { Switch, Route,   useHistory,
  Redirect } from "react-router-dom";
import * as Auth from "../utils/Auth"
import Preloader from "./Preloader/Preloader";
const Cards = lazy(() => import("./Cards/Cards"));



function App() {
  const history = useHistory();
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [load, setLoader] = useState(null)
  const [formToggle, setFormToggle] = useState(false);
  const [loggedIn, setLoginIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("")


  useEffect(() => {
    Auth.getOwnerInfo(token).then((res) =>{
      setName(res.name)
     }).then(() => {
    apiProfile.getCards().then(cards => {
      setCards(cards.articles)
      console.log(cards.articles)
       })
      })
  },[token])




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
// Authorization

const onRegister = (email, password, name) => {
  Auth.register(email, password, name).then((res) => {
    if (res) {
      history.push("/"); // Прокинуть юзера на страницу логина
    }
  }).catch((err) => {
    if(err === 400){
  console.log('Некорректно заполнено одно из полей ')
}
})
}
// Регистрация работает
const handleLogin = (email, password) => {
  Auth.signIn(email, password)
    .then((res) => {
      if (res && res.token) {
        //  Поменял ('jwt', token) на текущий вариант
        localStorage.setItem("jwt", res.token);
        setLoginIn(true);
        setToken(res.token)
        setName(res.name);
        history.push("/");
      }
    })
    .catch((error) => {
    // setInfoPopup(false)
    // onInfoPopup()
    if(error === 401){
    console.log('Пользователь с email не найден')}
    else if(error === 400){
    console.log('Не передано одно из полей ')
    }
  })
}

function handleTokenCheck() {
  const jwt = localStorage.getItem("jwt");
  if(jwt){setToken(jwt)
    Auth.checkToken(jwt)
    .then((res) => {
      if (res) {
        setLoginIn(true);
        setEmail(res.email);
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
}

const signOut = () => {
  setEmail("");
  localStorage.removeItem("jwt");
  history.push("/");
};

React.useEffect(() => {
  handleTokenCheck();
}, []);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div class="layout">
            <Header loggedIn={loggedIn}
            signOut={signOut}
            name={name}
            handleLoginPopup={handleLoginPopup} />
            <Main />
          </div>
          <Suspense fallback={<Preloader />}>
          <Cards cards={cards} loggedIn={loggedIn} />
          </Suspense>
          <About />
        </Route>

        <Route path="/saved-news">
          <Header
            loggedIn={handleLoginIn}
            handleLoginPopup={handleLoginPopup}
          />
          <SavedNewsHeader />
          <Suspense fallback={<Preloader />}>
          <Cards cards={cards} loggedIn={!loggedIn} />
          </Suspense>
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
          closeToOverlay={handleOverlayClose}
        ></LoginPopup>
      ) : (
        <RegistrationPopup
          isOpen={isLoginPopupOpen}
          onRegister={onRegister}
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
