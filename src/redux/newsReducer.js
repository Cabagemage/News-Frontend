import { SAVE_NEWS_CARD } from "./types";
const initialState = {
  cards: [],
  savedCards: [],
};
export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NEWS_CARD:
      return { ...state, savedCards: state.savedCards.concat(action.payload) };
    default:
      return state;
  }
};
