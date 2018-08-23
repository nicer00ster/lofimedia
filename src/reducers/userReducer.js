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
    uid: ''
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
        fetching: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case USER_UPDATED:
      return {
        ...state,
        user: {
          authenticated: true,
          displayName: action.data.providerData[0].displayName,
          email: action.data.providerData[0].email,
          photoURL: `${action.data.providerData[0].photoURL}?width=400`,
          uid: action.data.uid,
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
        ...initialState
      }
    default:
      return state;
  };
};
