import { combineReducers } from 'redux';
import musicReducer from './musicReducer';
import dailyReducer from './dailyReducer';
import userReducer from './userReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  tracks: musicReducer,
  daily: dailyReducer,
  user: userReducer,
  search: searchReducer
});

export default rootReducer;
