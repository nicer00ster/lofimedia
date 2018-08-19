import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  AUTHED_USER_UPDATED
} from '../constants'

const initialState = {
  user: {
    authenticated: false,
    fetchingUserData: false,
    displayName: '',
    email: '',
    photoURL: '',
  },
  isFetching: false,
  error: false
};

export default function userReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          fetchingUserData: true,
        }
      }
    case LOGOUT:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          authenticated: false,
          fetchingUserData: false,
          displayName: '',
          email: '',
          photoURL: '',
        },
        isFetching: false,
        error: false
      }
    case AUTHED_USER_UPDATED:
      return {
        ...state,
        user: {
          authenticated: true,
          displayName: action.data[0].displayName,
          email: action.data[0].email,
          photoURL: `${action.data[0].photoURL}?width=400`,
          fetchingUserData: false,
        },
        isFetching: true
      }
    case FETCH_USER:
      return {
        ...state,
        user: {
          authenticated: true,
          displayName: action.loginResult.profile.name,
          email: action.loginResult.profile.email,
          photoURL: action.loginResult.profile.picture.data.url,
          fetchingUserData: false,
        },
        isFetching: true
      }
    case LOGIN_SUCCESS:
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          authenticated: true,
          ...state.user
        },
        isFetching: false
      }
    case LOGIN_FAILURE:
    case FETCH_USER_FAILURE:
      return {
        ...state,
        user: {
          authenticated: false
        },
        error: true,
        isFetching: false
      }
    default:
      return state;
  };
};
