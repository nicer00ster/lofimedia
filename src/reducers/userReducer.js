import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../constants'

const initialState = {
  user: {},
  isFetching: false,
  error: false
};

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: {},
        isFetching: true
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        isFetching: false
      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false
      }
    default:
      return state;
  };
};
