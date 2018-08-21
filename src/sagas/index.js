import {
  FETCH_MUSIC,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
  FETCH_DAILY,
  FETCH_DAILY_SUCCESS,
  FETCH_DAILY_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_UPDATED,
  USER_UPDATED_SUCCESS,
  USER_UPDATED_FAILURE,
} from '../constants';

import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { apiMusic, apiDaily, apiUser } from '../api';
import { fbLogin, fbLogout } from '../auth/index';

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

function* facebookLogin(action) {
  try {
    const loginResult = yield call(fbLogin);
    yield put({ type: LOGIN_SUCCESS, loginResult })
  } catch (error) {
    yield put({ type: LOGIN_FAILURE })
  };
};

function* facebookLogout(action) {
  try {
    yield delay(3000)
    yield call(fbLogout);
    yield put({ type: LOGOUT_SUCCESS })
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_FAILURE })
  };
};

function* updateUser(action) {
  try {
    yield put({ type: USER_UPDATED_SUCCESS })
  } catch (error) {
    console.log(error);
    yield put({ type: USER_UPDATED_FAILURE })
  };
};

function* rootSaga() {
  yield takeEvery(FETCH_MUSIC, fetchMusic)
  yield takeEvery(FETCH_DAILY, fetchDaily)
  yield takeEvery(LOGIN, facebookLogin)
  yield takeEvery(LOGOUT, facebookLogout)
  yield takeEvery(USER_UPDATED, updateUser)
};

export default rootSaga;
