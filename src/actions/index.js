import {
  FETCH_MUSIC,
  FETCH_DAILY,
  LOGIN,
  LOGOUT,
  USER_UPDATED,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  NEXT_SONG,
  PREV_SONG,
  TOGGLE_SHUFFLE,
  TOGGLE_REPEAT,
  SET_TIME,
  SET_DURATION,
  SEEK_TIME
} from '../constants'

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

//  MUSIC METHODS
export function playMusic() {
  return {
    type: PLAY_MUSIC
  };
};

export function pauseMusic() {
  return {
    type: PAUSE_MUSIC
  };
};

export function nextSong() {
  return {
    type: NEXT_SONG
  };
};

export function prevSong() {
  return {
    type: PREV_SONG
  };
};

export function shuffleMusic() {
  return {
    type: TOGGLE_SHUFFLE
  };
};


export function repeatMusic() {
  return {
    type: TOGGLE_REPEAT
  };
};

export function setDuration(data) {
  return {
    type: SET_DURATION,
    data
  };
};

export function setTime(data) {
  return {
    type: SET_TIME,
    data
  };
};

export function seek(time) {
  // this.props.screenProps.forwardedRef && this.props.screenProps.forwardedRef.seek(time);
  time = Math.round(time);
  console.log('time here', time);
  return {
    type: SEEK_TIME,
    time
  };
};
