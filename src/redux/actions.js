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
  REMOVE_NEWS_CARD,
  SET_USER_INFORMATION,
  GET_SAVED_CARDS,
} from "./types.js";
import { newsProfile } from "../utils/API/NewsApi";
import { mainApi } from "../utils/API/MainApi";
import * as Auth from "../utils/API/Auth";

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
export function setUserInfo(token) {
  return async (dispatch) => {
    try {
      const getOwnerInfo = await mainApi.getOwnerInfo(token);
      const res = getOwnerInfo;
      dispatch({ type: SET_USER_INFORMATION, payload: res });
      if (!res) {
        dispatch({ type: SET_USER_INFORMATION, payload: null });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
}
//All about news
export function getSavedCards(token) {
  return async (dispatch) => {
    try {
      const savedNews = await mainApi.getSavedCards(token);
      const res = savedNews;
      console.log(res, res.date);
      dispatch({ type: GET_SAVED_CARDS, payload: res.date });
      if (!res.date) {
        dispatch({ type: GET_SAVED_CARDS, payload: [] });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
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
      localStorage.setItem("keyword", keyword);
      localStorage.setItem("articles", JSON.stringify(getCards));
      dispatch(setKeyword(keyword));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(hideLoader());
    }
  };
}
export function getKeyword(keyword) {
  return async (dispatch) => {
    dispatch({ type: SET_KEYWORD, payload: keyword });
  };
}
export function handleSaveCard({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  owner,
  token,
}) {
  return async (dispatch) => {
    try {
      const handleSaveCard = await mainApi.addNewCard(token, {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner,
      });
      const response = await newsProfile.getCards(keyword);
      const getCards = await response.articles;

      const newCards = getCards.map((card) => {
        if (card.url === handleSaveCard.link) {
          return {
            ...card,
            id: handleSaveCard._id,
            owner: handleSaveCard.owner,
          };
        }
        return card;
      });

      dispatch({ type: FETCH_NEWS_CARDS, payload: newCards });
      dispatch({ type: SAVE_NEWS_CARD, payload: handleSaveCard });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
}
export function handleDeleteCard(token, id) {
  return async (dispatch) => {
    try {
      await mainApi.deleteThisCard(token, id);
      dispatch({ type: REMOVE_NEWS_CARD, payload: id });
    } catch (err) {
      if (err === 409) {
        console.log(err);
      }
    } finally {
    }
  };
}

// Auth
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
