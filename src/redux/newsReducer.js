import { SAVE_NEWS_CARD, FETCH_NEWS_CARDS, SET_KEYWORD } from "./types";

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
        savedCards: state.savedCards.concat([action.payload]),
      };
    case FETCH_NEWS_CARDS:
      return {
        ...state,
        fetchedNews: action.payload,
      };
      case SET_KEYWORD: return {...state, keyword: action.payload}
    default:
      return state;
  }
};
