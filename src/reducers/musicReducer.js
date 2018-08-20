import {
  FETCH_MUSIC,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  NEXT_SONG,
  PREV_SONG,
  SHUFFLE_MUSIC,
  REPEAT_MUSIC,
  SET_TIME,
  SET_DURATION
} from '../constants'

const initialState = {
  tracks: [],
  shuffle: false,
  repeat: false,
  index: 0,
  paused: true,
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
        paused: false,
      }
    case PAUSE_MUSIC:
      return {
        ...state,
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
    case SHUFFLE_MUSIC:
      return {
        ...state,
        shuffle: !state.shuffle,
        repeat: false
      }
    case REPEAT_MUSIC:
      return {
        ...state,
      }
    case SET_TIME:
      return {
        ...state,
      }
    case SET_DURATION:
      return {
        ...state,
      }
    default:
      return state;
  };
};
