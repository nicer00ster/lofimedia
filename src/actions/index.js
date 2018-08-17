import { FETCH_MUSIC, FETCH_DAILY, FETCH_USER } from '../constants'

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

export function fetchUser() {
  return {
    type: FETCH_USER
  };
};
