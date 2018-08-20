import { FETCH_MUSIC, FETCH_MUSIC_SUCCESS, FETCH_MUSIC_FAILURE } from '../constants'

const initialState = {
  tracks: [],
  fetching: false,
  error: false
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
    default:
      return state;
  };
};
