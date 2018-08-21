import {
  FETCH_MUSIC,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
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

const initialState = {
  tracks: [],
  shuffle: false,
  repeat: false,
  index: 0,
  paused: true,
  duration: 1,
  position: 0,
  stream: {
    live: false
  },
  fetching: false,
  error: false,
};

export default function musicReducer (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_MUSIC:
      return {
        ...state,
        tracks: [],
        fetching: true
      }
    case FETCH_MUSIC_SUCCESS:
      return {
        ...state,
        tracks: action.data,
        fetching: false
      }
    case FETCH_MUSIC_FAILURE:
      return {
        ...state,
        error: true,
        fetching: false
      }
    case PLAY_MUSIC:
      return {
        ...state,
        position: state.position,
        paused: false,
      }
    case PAUSE_MUSIC:
      return {
        ...state,
        position: state.position,
        paused: true,
      }
    case NEXT_SONG:
      return {
        ...state,
        index: state.index + 1,
        paused: false,
      }
    case PREV_SONG:
      return {
        ...state,
        index: state.index !== 0 ? state.index - 1 : 0,
        paused: false,
      }
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
        repeat: false
      }
    case TOGGLE_REPEAT:
      return {
        ...state,
        shuffle: false,
        repeat: !state.repeat
      }
    case SEEK_TIME:
    console.log('seektime2', action);
      return {
        ...state,
        paused: true,
        position: Math.floor(action.time),
      }
    case SET_DURATION:
    console.log('duration', action);
      return {
        ...state,
        duration: Math.floor(action.data.duration),
      }
    case SET_TIME:
    console.log('set_time', action.data.currentTime);
      return {
        ...state,
        position: Math.floor(action.data.currentTime),
      }
    default:
      return state;
  };
};
