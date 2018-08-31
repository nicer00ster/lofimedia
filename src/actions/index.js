import {
  FETCH_MUSIC,
  FETCH_DAILY,
  FETCH_USERS,
  LOGIN,
  LOGOUT,
  USER_UPDATED,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  NEXT_SONG,
  PREV_SONG,
  SHUFFLE_SONG,
  FOLLOW_USER,
  UNFOLLOW_USER,
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

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data,
  };
}

export function followUser(user, uid, followuid) {
  return {
    type: FOLLOW_USER,
    user,
    uid,
    followuid,
  };
}

export function unfollowUser(user, uid, followuid) {
  return {
    type: UNFOLLOW_USER,
    user,
    uid,
    followuid,
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
