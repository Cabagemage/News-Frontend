import { SAVE_NEWS_CARD } from "./types.js";
export function createSaveNews(savedCard) {
  return {
    type: SAVE_NEWS_CARD,
    payload: savedCard,
  };
}
