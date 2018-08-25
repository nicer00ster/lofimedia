import { removeByKey } from '../helpers';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  USER_UPDATED,
  USER_UPDATED_SUCCESS,
  USER_UPDATED_FAILURE,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  PLAYLIST_ADD,
  PLAYLIST_REMOVE
} from '../constants'

const initialState = {
  user: {
    authenticated: false,
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    playlist: []
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
    case FETCH_PLAYLIST:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: {
          ...state.user,
          playlist: action.data
        }
      }
    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        error: true
      }
    case PLAYLIST_ADD:
    let index = action.trackID;
    let playlist = { [index]: action.track, ...state.user.playlist }
      return {
        ...state,
        user: {
          ...state.user,
          playlist: playlist
        }
      }
    case PLAYLIST_REMOVE:
      return {
        ...state,
        user: {
          ...state.user,
          playlist: removeByKey(state.user.playlist, action.trackID)
        }
      }
    default:
      return state;
  };
};
