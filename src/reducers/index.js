import { combineReducers } from 'redux';
import musicReducer from './musicReducer';
import dailyReducer from './dailyReducer';

const rootReducer = combineReducers({
  tracks: musicReducer,
  daily: dailyReducer
});

export default rootReducer;
