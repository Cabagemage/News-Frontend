import { combineReducers } from "redux";
import { newsReducer } from "./newsReducer";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
  news: newsReducer,
  app: appReducer,
  currentUser: userReducer,
});
