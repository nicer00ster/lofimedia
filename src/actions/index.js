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
  SHUFFLE_SONG,
  // REPEAT_SONG,
  TOGGLE_NOTIFICATIONS,
  TOGGLE_SHUFFLE,
  TOGGLE_REPEAT,
  SEARCH,
  FETCH_PLAYLIST,
  PLAYLIST_ADD,
  PLAYLIST_REMOVE,
  ADD_TRACK,
  GLOBAL_PLAY,
  // SET_TIME,
  // SET_DURATION,
  // SEEK_TIME,
} from '../constants';

// API METHODS
export function fetchMusic() {
  return {
    type: FETCH_MUSIC,
  };
}

export function fetchDaily() {
  return {
    type: FETCH_DAILY,
  };
}

export function updateUserInfo(data, user) {
  return {
    type: USER_UPDATED,
    data,
    user,
  };
}

export function onfbLogin() {
  return {
    type: LOGIN,
  };
}

export function onfbLogout() {
  return {
    type: LOGOUT,
  };
}

export function toggleNotifications(uid, bool) {
  return {
    type: TOGGLE_NOTIFICATIONS,
    uid,
    bool,
  };
}

//  MUSIC METHODS
export function globalPlay(tracks, uid) {
  let index;
  Object.keys(tracks).map((item, key) => {
    if (item === uid) {
      index = key;
    }
  });
  return {
    type: GLOBAL_PLAY,
    index,
  };
}

export function playMusic() {
  return {
    type: PLAY_MUSIC,
  };
}

export function pauseMusic() {
  return {
    type: PAUSE_MUSIC,
  };
}

export function nextSong() {
  return {
    type: NEXT_SONG,
  };
}

export function prevSong() {
  return {
    type: PREV_SONG,
  };
}

export function shuffleSong() {
  return {
    type: SHUFFLE_SONG,
  };
}

// export function repeatSong() {
//   return {
//     type: REPEAT_SONG,
//   };
// }

export function shuffleMusic() {
  return {
    type: TOGGLE_SHUFFLE,
  };
}


export function repeatMusic() {
  return {
    type: TOGGLE_REPEAT,
  };
}

export function searchMusic(query, tracks) {
  return {
    type: SEARCH,
    query,
    tracks,
  };
}

export function fetchPlaylist(uid) {
  return {
    type: FETCH_PLAYLIST,
    uid,
  };
}

export function playlistAdd(track, uid, trackID) {
  return {
    type: PLAYLIST_ADD,
    track,
    uid,
    trackID,
  };
}

export function playlistRemove(track, uid, trackID) {
  return {
    type: PLAYLIST_REMOVE,
    track,
    uid,
    trackID,
  };
}

export function addTrack(track) {
  return {
    type: ADD_TRACK,
    track,
  };
}

// export function setDuration(data) {
//   return {
//     type: SET_DURATION,
//     data
//   };
// };
//
// export function setTime(data) {
//   return {
//     type: SET_TIME,
//     data
//   };
// };
//
// export function seek(time) {
//   // this.props.screenProps.forwardedRef && this.props.screenProps.forwardedRef.seek(time);
//   time = Math.round(time);
//   return {
//     type: SEEK_TIME,
//     time
//   };
// };
