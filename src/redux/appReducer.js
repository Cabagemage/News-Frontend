import {
  START_SEARCH,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_TOKEN,
  REMOVE_TOKEN,
  LOGIN_TRUE,
  LOGIN_FALSE,
} from "./types";

const initialState = {
  loading: false,
  search: false,
  token: '',
  loggedIn: false,
};
const token = localStorage.getItem("token");

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
      return { ...state, token: false };
    case LOGIN_TRUE:
      return { ...state, loggedIn: true };
    case LOGIN_FALSE:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
