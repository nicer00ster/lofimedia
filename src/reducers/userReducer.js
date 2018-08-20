import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  USER_UPDATED,
  USER_UPDATED_SUCCESS,
  USER_UPDATED_FAILURE,
} from '../constants'

const initialState = {
  user: {
    authenticated: false,
    fetchingUserData: false,
    displayName: '',
    email: '',
    photoURL: '',
  },
  fetching: false,
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
        },
        fetching: true,
        error: false
      }
      // case FETCH_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          authenticated: true,
          ...state.user
        },
        fetching: false,
        error: false
      }
    // case FETCH_USER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        user: {
          authenticated: false
        },
        error: true,
        fetching: false
      }
    case LOGOUT:
      return {
        ...state,
        user: {
          authenticated: false,
          fetchingUserData: false,
          displayName: '',
          email: '',
          photoURL: '',
        },
        fetching: true,
        error: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user
        },
        fetching: false,
        error: false
      }
    case USER_UPDATED:
      return {
        ...state,
        user: {
          authenticated: true,
          displayName: action.data[0].displayName,
          email: action.data[0].email,
          photoURL: `${action.data[0].photoURL}?width=400`,
          fetchingUserData: false,
        },
        fetching: true
      }
    case USER_UPDATED_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user
        },
        fetching: false
      }
    case USER_UPDATED_FAILURE:
      return {
        ...state,
        user: {
          authenticated: false,
          fetchingUserData: false,
          displayName: '',
          email: '',
          photoURL: '',
        },
        fetching: true,
        error: false
      }
    // case FETCH_USER:
    //   return {
    //     ...state,
    //     user: {
    //       authenticated: true,
    //       displayName: action.loginResult.profile.name,
    //       email: action.loginResult.profile.email,
    //       photoURL: action.loginResult.profile.picture.data.url,
    //       fetchingUserData: false,
    //     },
    //     fetching: true
    //   }
    default:
      return state;
  };
};
