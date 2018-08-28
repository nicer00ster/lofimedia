import { FETCH_DAILY, FETCH_DAILY_SUCCESS, FETCH_DAILY_FAILURE } from '../constants';

const initialState = {
  daily: '',
  fetching: false,
  error: false,
};

export default function dailyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DAILY:
      return {
        ...state,
        daily: '',
        fetching: true,
      };
    case FETCH_DAILY_SUCCESS:
      return {
        ...state,
        daily: action.data,
        fetching: false,
      };
    case FETCH_DAILY_FAILURE:
      return {
        ...state,
        error: true,
        fetching: false,
      };
    default:
      return state;
  }
}
