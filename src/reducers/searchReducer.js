import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from '../constants'

const initialState = {
  searching: false,
  results: null
};

export default function searchReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
    console.log('search', action);
      return {
        ...state,
        searching: true,
      }
    case SEARCH_SUCCESS:
    console.log('searchsuccess',action );
      return {
        ...state,
        searching: false,
        query: action.query,
        results: action.results
      }
    case SEARCH_FAILURE:
      return {
        ...state,
        searching: false,
      }
    default:
      return state;
  };
};
