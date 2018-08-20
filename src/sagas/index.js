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
  PLAY_MUSIC,
  PLAY_MUSIC_SUCCESS,
  PLAY_MUSIC_FAILURE,
  PAUSE_MUSIC,
  PAUSE_MUSIC_SUCCESS,
  PAUSE_MUSIC_FAILURE,
  NEXT_SONG,
  NEXT_SONG_SUCCESS,
  NEXT_SONG_FAILURE,
  PREV_SONG,
  PREV_SONG_SUCCESS,
  PREV_SONG_FAILURE,
  SHUFFLE_MUSIC,
  SHUFFLE_MUSIC_SUCCESS,
  SHUFFLE_MUSIC_FAILURE,
  REPEAT_MUSIC,
  REPEAT_MUSIC_SUCCESS,
  REPEAT_MUSIC_FAILURE,
  SET_TIME,
  SET_TIME_SUCCESS,
  SET_TIME_FAILURE,
  SET_DURATION,
  SET_DURATION_SUCCESS,
  SET_DURATION_FAILURE,
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
    console.log(action);
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
    console.log('here', action);
    yield put({ type: USER_UPDATED_SUCCESS })
  } catch (error) {
    console.log(error);
    yield put({ type: USER_UPDATED_FAILURE })
  };
};

function* playMusic(action) {
  try {
    yield put({ type: PLAY_MUSIC_SUCCESS })
  } catch(error) {
    console.log(error);
    yield put({ type: PLAY_MUSIC_FAILURE })
  };
};

function* pauseMusic(action) {
  try {
    yield put({ type: PAUSE_MUSIC_SUCCESS })
  } catch(error) {
    console.log(error);
    yield put({ type: PAUSE_MUSIC_FAILURE })
  };
};

function* playNext(action) {
  try {
    yield put({ type: NEXT_SONG_SUCCESS })
  } catch(error) {
    console.log(error);
    yield put({ type: NEXT_SONG_FAILURE })
  };
};

function* playPrev(action) {
  try {
    yield put({ type: PREV_SONG_SUCCESS })
  } catch(error) {
    console.log(error);
    yield put({ type: PREV_SONG_FAILURE })
  };
};

function* shuffle(action) {
  yield put({ type: SHUFFLE_MUSIC })
}

function* rootSaga() {
  yield takeEvery(FETCH_MUSIC, fetchMusic)
  yield takeEvery(FETCH_DAILY, fetchDaily)
  yield takeEvery(LOGIN, facebookLogin)
  yield takeEvery(LOGOUT, facebookLogout)
  yield takeEvery(USER_UPDATED, updateUser)
  yield takeEvery(PLAY_MUSIC, playMusic)
  yield takeEvery(PAUSE_MUSIC, pauseMusic)
  yield takeEvery(NEXT_SONG, playNext)
  yield takeEvery(PREV_SONG, playPrev)
  yield takeLatest(SHUFFLE_MUSIC, shuffle)
};

export default rootSaga;
