import { FETCH_MUSIC, FETCH_DAILY, FETCH_USER, LOGIN, LOGOUT, AUTHED_USER_UPDATED } from '../constants'

export function fetchMusic() {
  return {
    type: FETCH_MUSIC
  };
};

export function fetchDaily() {
  return {
    type: FETCH_DAILY
  };
};

export function fetchUser(userId, token) {
  return {
    type: FETCH_USER,
    userId,
    token
  };
};

export function updateUserInfo(data) {
  return {
    type: AUTHED_USER_UPDATED,
    data
  };
};

export function onfbLogin() {
  return {
    type: LOGIN
  };
};

export function onfbLogout() {
  return {
    type: LOGOUT
  };
};
