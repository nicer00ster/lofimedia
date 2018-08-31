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
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  PLAYLIST_ADD,
  PLAYLIST_REMOVE,
  TOGGLE_NOTIFICATIONS,
} from '../constants';

const initialState = {
  user: {
    authenticated: false,
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    followers: 0,
    following: 0,
    playlist: [],
    superuser: false,
    notifications: true,
  },
  userlist: null,
  fetching: false,
  error: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
        },
        fetching: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          authenticated: true,
          ...state.user,
        },
        fetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: {
          authenticated: false,
        },
        error: true,
        fetching: false,
      };
    case LOGOUT:
    case FETCH_USERS:
    case FETCH_PLAYLIST:
      return {
        ...state,
        fetching: true,
      };
    case LOGOUT_SUCCESS:
    case USER_UPDATED_FAILURE:
      return {
        ...initialState,
        userlist: state.userlist,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userlist: action.data,
      };
    case USER_UPDATED:
    console.log('hererere', action);
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: true,
          displayName: action.data.providerData[0].displayName,
          email: action.data.providerData[0].email,
          photoURL: `${action.data.providerData[0].photoURL}?width=400`,
          uid: action.data.uid,
        },
        fetching: true,
      };
    case USER_UPDATED_SUCCESS:
    console.log('here', action);
      return {
        ...state,
        user: {
          ...state.user,
          superuser: action.user === null ? state.user.superuser : action.user.superuser,
          playlist: action.user === null ? state.user.playlist : action.user.playlist,
          notifications: action.user === null ? state.user.notifications : action.user.notifications,
          followers: action.user === null ? state.user.followers : action.user.followers,
          following: action.user === null ? state.user.following : action.user.following,
        },
        fetching: false,
      };
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: {
          ...state.user,
          playlist: action.data,
        },
      };
    case FETCH_USERS_FAILURE:
    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        error: true,
      };
    case PLAYLIST_ADD:
      return {
        ...state,
        user: {
          ...state.user,
          playlist: {
            ...state.user.playlist,
            [action.trackID]: {
              ...action.track,
            },
          },
        },
      };
    case PLAYLIST_REMOVE:
      return {
        ...state,
        user: {
          ...state.user,
          playlist: removeByKey(state.user.playlist, action.trackID),
        },
      };
    case TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        user: {
          ...state.user,
          notifications: !action.bool,
        },
      };
    default:
      return state;
  }
}
