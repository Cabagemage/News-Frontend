import {
  SAVE_NEWS_CARD,
  FETCH_NEWS_CARDS,
  SET_KEYWORD,
  REMOVE_NEWS_CARD,
  GET_SAVED_CARDS,
} from "./types";

const initialState = {
  fetchedNews: [],
  savedCards: [],
  keyword: "",
};
export const newsReducer = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_NEWS_CARD:
      return {
        ...state,
        savedCards: [...state.savedCards, action.payload],
      };

    case GET_SAVED_CARDS:
      return { ...state, savedCards: action.payload };

    case REMOVE_NEWS_CARD:
      const id = action.payload;
      return {
        ...state,
        savedCards: [...state.savedCards.filter((item) => item._id !== id)],
      };

    case FETCH_NEWS_CARDS:
      return {
        ...state,
        fetchedNews: action.payload,
      };

    case SET_KEYWORD:
      return { ...state, keyword: action.payload };

    default:
      return state;
  }
};
