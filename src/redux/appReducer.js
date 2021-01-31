import {
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
} from "./types";

const initialState = {
  loading: false,
  search: false,
  token: "",
  loggedIn: false,
  isLoginPopupOpen: false,
  message: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCH:
      return { ...state, search: true };

    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };

    case SET_TOKEN:
      return { ...state, token: action.payload };
    case REMOVE_TOKEN:
      return { ...state, token: '' };


    case LOGIN_TRUE:
      return { ...state, loggedIn: true };
    case LOGIN_FALSE:
      return { ...state, loggedIn: false };

    case SET_POPUP_OPEN:
      return { ...state, isLoginPopupOpen: true };
    case SET_POPUP_CLOSE:
      return { ...state, isLoginPopupOpen: false };

      case SET_MESSAGE_TRUE: return {...state, message: true}
      case SET_MESSAGE_FALSE: return {...state, message: false}
    default:
      return state;
  }
};
