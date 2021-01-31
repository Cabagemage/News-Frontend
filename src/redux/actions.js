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
export function fetchCards(keyword) {
  return async (dispatch) => {
    try {
      dispatch(startSearch());
      dispatch(showLoader());
      const response = await newsProfile.getCards(keyword);
      const getCards = await response.articles;
      dispatch({ type: FETCH_NEWS_CARDS, payload: getCards });
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
      console.log(res);
      dispatch({ type: SET_TOKEN, payload: res.token });
      localStorage.setItem("token", res.token);
      dispatch(setLoggedIn());
    } catch (e) {
      console.log(e);
    } finally {
      console.log("hello");
    }
  };
}

// export function onRegister(email, password, name) {
//   return async (dispatch) => {
//     try {
//       const register = await Auth.register(email, password, name);
//       if (register) {
//         setLoginPopupOpen(false);
//         setMessage(true);
//         setInfoPopupOpen(true);
//         history.push("/");
//       }
//     } catch (err) {
//       if (err === 409) {
//         console.log("Такой пользователь уже существует");
//       }
//     } finally {
//     }
//   };
// }

