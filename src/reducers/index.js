import { combineReducers } from 'redux';
import musicReducer from './musicReducer';
import dailyReducer from './dailyReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  tracks: musicReducer,
  daily: dailyReducer,
  user: userReducer,
});

export default rootReducer;
