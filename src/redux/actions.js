import {
  SAVE_NEWS_CARD,
  FETCH_NEWS_CARDS,
  START_SEARCH,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_TOKEN,
  REMOVE_TOKEN,
  LOGIN_TRUE,
  LOGIN_FALSE,
  SET_POPUP_OPEN,
  SET_POPUP_CLOSE,
  SET_MESSAGE_TRUE,
  SET_MESSAGE_FALSE,
  SET_KEYWORD,
} from "./types.js";
import { newsProfile } from "../utils/API/NewsApi";
import { mainApi } from "../utils/API/MainApi";
import * as Auth from "../utils/API/Auth";

export function createSaveNews(savedCard) {
  return {
    type: SAVE_NEWS_CARD,
    payload: savedCard,
  };
}
export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function removeToken() {
  return {
    type: REMOVE_TOKEN,
  };
}

export function setLoggedIn() {
  return {
    type: LOGIN_TRUE,
  };
}
export function removeLoggedIn() {
  return {
    type: LOGIN_FALSE,
  };
}
export function setPopupLoginOpen() {
  return {
    type: SET_POPUP_OPEN,
  };
}
export function setPopupLoginClose() {
  return {
    type: SET_POPUP_CLOSE,
  };
}
export function setMessageTrue() {
  return {
    type: SET_MESSAGE_TRUE,
  };
}
export function setMessageFalse() {
  return {
    type: SET_MESSAGE_FALSE,
  };
}
export function setKeyword(keyword) {
  return {
    type: SET_KEYWORD,
    payload: keyword,
  };
}
export function fetchCards(keyword) {
  return async (dispatch) => {
    try {
      dispatch(startSearch());
      dispatch(showLoader());
      const response = await newsProfile.getCards(keyword);
      const getCards = await response.articles;
      dispatch({ type: FETCH_NEWS_CARDS, payload: getCards });
      dispatch(setKeyword(keyword));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoader());
    }
  };
}
export function handleLogin(email, password) {
  return async (dispatch) => {
    try {
      const res = await Auth.signIn(email, password);
      dispatch({ type: SET_TOKEN, payload: res.token });
      localStorage.setItem("token", res.token);
      dispatch(setLoggedIn());
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setPopupLoginClose());
      console.log("hello");
    }
  };
}

export function handleTokenCheck() {
  return async (dispatch) => {
    const jwt = localStorage.getItem("token");
    console.log(jwt);
    try {
      let response = await Auth.checkToken(jwt);
      if (response) {
        dispatch({ type: SET_TOKEN, payload: jwt });
        dispatch(setLoggedIn());
      }
      console.log(jwt, response);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
}
export function onRegister(email, password, name) {
  return async (dispatch) => {
    try {
      const register = await Auth.register(email, password, name);
      if (register) {
        dispatch(setPopupLoginClose());
        dispatch(setMessageTrue());
      }
    } catch (err) {
      if (err === 409) {
        console.log("Такой пользователь уже существует");
      }
    } finally {
    }
  };
}

// async function onRegister(email, password, name) {
//   try {
//     const register = await Auth.register(email, password, name);
//     if (register) {
//       setLoginPopupOpen(false);
//       setMessage(true);
//       setInfoPopupOpen(true);
//       history.push("/");
//     }
//   } catch (err) {
//     if (err === 409) {
//       console.log("Такой пользователь уже существует");
//     }
//   } finally {
//   }
// }
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
// async function handleTokenCheck() {
//   const jwt = localStorage.getItem("jwt");
//   try {
//     // showLoader();
//     let response = await Auth.checkToken(jwt);
//     if (response) {
//       setToken(jwt);
//       setLoginIn(true);
//       history.push("/");
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     // hideLoader();
//   }
// }
