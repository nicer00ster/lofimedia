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
        query: action.query,
      }
    case SEARCH_SUCCESS:
    console.log('searchsuccess',action );
      return {
        ...state,
        searching: false,
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
