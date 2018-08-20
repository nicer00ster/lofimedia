import { FETCH_MUSIC, FETCH_DAILY, FETCH_USER, LOGIN, LOGOUT, USER_UPDATED } from '../constants'

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

export function updateUserInfo(data) {
  return {
    type: USER_UPDATED,
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
