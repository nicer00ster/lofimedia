import { combineReducers } from 'redux';
import musicReducer from './musicReducer';

const rootReducer = combineReducers({
  tracks: musicReducer
});

export default rootReducer;
