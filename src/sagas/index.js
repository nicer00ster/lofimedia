import {
  FETCH_MUSIC,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
  FETCH_DAILY,
  FETCH_DAILY_SUCCESS,
  FETCH_DAILY_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../constants';

import { put, takeEvery, call } from 'redux-saga/effects'
import { apiMusic, apiDaily, apiUser } from '../api';

function* fetchMusic(action) {
  try {
    const data = yield call(apiMusic);
    yield put({ type: FETCH_MUSIC_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_MUSIC_FAILURE })
  };
};

function* fetchDaily(action) {
  try {
    const data = yield call(apiDaily);
    yield put({ type: FETCH_DAILY_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_DAILY_FAILURE })
  };
};

function* fetchUser(action) {
  try {
    const user = yield call(apiUser, action.userId, action.token);
    yield put({ type: FETCH_USER_SUCCESS, user });
  } catch (error) {
    yield put({ type: FETCH_USER_FAILURE })
  };
};

function* rootSaga () {
  yield takeEvery(FETCH_MUSIC, fetchMusic)
  yield takeEvery(FETCH_DAILY, fetchDaily)
  yield takeEvery(FETCH_USER, fetchUser)
};

export default rootSaga;
