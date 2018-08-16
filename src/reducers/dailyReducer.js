import { FETCH_DAILY, FETCH_DAILY_SUCCESS, FETCH_DAILY_FAILURE } from '../constants'

const initialState = {
  daily: '',
  isFetching: false,
  error: false
};

export default function dailyReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_DAILY:
      return {
        ...state,
        daily: '',
        isFetching: true
      }
    case FETCH_DAILY_SUCCESS:
      return {
        ...state,
        daily: action.data,
        isFetching: false
      }
    case FETCH_DAILY_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false
      }
    default:
      return state;
  };
};
