import {combineReducers} from 'redux'
import {newsReducer} from './newsReducer'
import {appReducer} from './appReducer'
export const rootReducer = combineReducers({
  news: newsReducer,
  app: appReducer
})

