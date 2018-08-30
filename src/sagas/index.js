import { put, takeEvery, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  FETCH_MUSIC,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
  FETCH_DAILY,
  FETCH_DAILY_SUCCESS,
  FETCH_DAILY_FAILURE,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  PLAYLIST_ADD,
  PLAYLIST_REMOVE,
  ADD_HEART,
  REMOVE_HEART,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_UPDATED,
  USER_UPDATED_SUCCESS,
  USER_UPDATED_FAILURE,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  ADD_TRACK,
  ADD_TRACK_SUCCESS,
  ADD_TRACK_FAILURE,
  TOGGLE_NOTIFICATIONS,
} from '../constants';

import { apiMusic, apiDaily } from '../api';
import { fbLogin, fbLogout } from '../auth/index';
import { filterObject } from '../helpers';
import rsf from '../config/rsf';

function* fetchMusic() {
  try {
    const data = yield call(apiMusic);
    yield put({ type: FETCH_MUSIC_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_MUSIC_FAILURE });
  }
}

function* fetchDaily() {
  try {
    const data = yield call(apiDaily);
    yield put({ type: FETCH_DAILY_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_DAILY_FAILURE });
  }
}

function* playlistSaga(action) {
  try {
    const data = yield call(rsf.database.read, `users/${action.uid}/playlist`);
    yield put({ type: FETCH_PLAYLIST_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_PLAYLIST_FAILURE });
  }
}

function* playlistAdd(track) {
  const hearts = yield call(rsf.database.read, `tracks/${track.trackID}/hearts`);
  yield call(rsf.database.update, `tracks/${track.trackID}`, {
    ...track.track,
    hearts: hearts + 1,
  });
  yield call(rsf.database.update, `users/${track.uid}/playlist/${track.trackID}`, {
    ...track.track,
    hearts: hearts + 1,
  });
  yield put({ type: ADD_HEART, track, hearts });
}

function* playlistRemove(data) {
  const hearts = yield call(rsf.database.read, `tracks/${data.trackID}/hearts`);
  yield call(rsf.database.update, `tracks/${data.trackID}`, {
    ...data.track,
    hearts: hearts - 1,
  });
  yield call(rsf.database.delete, `users/${data.uid}/playlist/${data.trackID}`);
  yield put({ type: REMOVE_HEART, data, hearts });
}

function* facebookLogin() {
  try {
    const loginResult = yield call(fbLogin);
    yield put({ type: LOGIN_SUCCESS, loginResult });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE });
  }
}

function* facebookLogout() {
  try {
    yield delay(2000);
    yield call(fbLogout);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE });
  }
}

function* updateUser(data) {
  const user = yield call(rsf.database.read, `users/${data.data._user.uid}`);
  try {
    yield put({ type: USER_UPDATED_SUCCESS, user });
  } catch (error) {
    yield put({ type: USER_UPDATED_FAILURE });
  }
}

function* toggleNotifications(data) {
  yield call(rsf.database.update, `users/${data.uid}/notifications`, !data.bool);
}

function* searchQuery(action) {
  try {
    const results = yield call(filterObject, action.tracks, action.query);
    yield delay(1250);
    yield put({ type: SEARCH_SUCCESS, results });
  } catch (error) {
    yield put({ type: SEARCH_FAILURE });
  }
}

function* addTrack(action) {
  const { track } = action;
  try {
    const key = yield call(rsf.database.create, 'tracks', {
      ...track,
      hearts: 0,
    });
    yield call(rsf.database.update, `tracks/${key}`, {
      ...track,
      hearts: 0,
      uid: key,
    });
    yield delay(1250);
    yield put({ type: ADD_TRACK_SUCCESS, track, key });
  } catch (error) {
    yield put({ type: ADD_TRACK_FAILURE });
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_MUSIC, fetchMusic);
  yield takeEvery(FETCH_DAILY, fetchDaily);
  yield takeEvery(FETCH_PLAYLIST, playlistSaga);
  yield takeEvery(PLAYLIST_ADD, playlistAdd);
  yield takeEvery(PLAYLIST_REMOVE, playlistRemove);
  yield takeEvery(LOGIN, facebookLogin);
  yield takeEvery(LOGOUT, facebookLogout);
  yield takeEvery(USER_UPDATED, updateUser);
  yield takeEvery(SEARCH, searchQuery);
  yield takeEvery(ADD_TRACK, addTrack);
  yield takeEvery(TOGGLE_NOTIFICATIONS, toggleNotifications);
}

export default rootSaga;
