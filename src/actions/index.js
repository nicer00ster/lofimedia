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
  SHUFFLE_MUSIC,
  REPEAT_MUSIC,
  SET_TIME,
  SET_DURATION,
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
    type: SHUFFLE_MUSIC
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
  time = Math.round(time);
  this.refs.audioRef && this.refs.audioRef.seek(time);
  this.setState({
    currentPosition: time,
    paused: false,
  });
};



export function onRepeat() {
  this.setState({ repeatOn: !this.state.repeatOn });
  if(this.state.shuffleOn) {
    this.setState({ shuffleOn: false, repeatOn: true });
  };
};
