import { FETCH_MUSIC, FETCH_MUSIC_SUCCESS, FETCH_MUSIC_FAILURE } from '../constants'

const initialState = {
  tracks: [],
  isFetching: false,
  error: false
};

export default function menuReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_MUSIC:
      return {
        ...state,
        tracks: [],
        isFetching: true
      }
    case FETCH_MUSIC_SUCCESS:
      return {
        ...state,
        tracks: action.data,
        isFetching: false
      }
    case FETCH_MUSIC_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false
      }
    default:
      return state;
  };
};
