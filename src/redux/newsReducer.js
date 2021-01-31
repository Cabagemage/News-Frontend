import { SAVE_NEWS_CARD } from "./types";
import { FETCH_NEWS_CARDS } from "./types";

const initialState = {
  fetchedNews: [],
  savedCards: [],
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
    default:
      return state;
  }
};
