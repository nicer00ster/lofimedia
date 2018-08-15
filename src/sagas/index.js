import { FETCH_MUSIC, FETCH_MUSIC_SUCCESS, FETCH_MUSIC_FAILURE } from '../constants'
import { put, takeEvery, call } from 'redux-saga/effects'
import { apiMusic } from '../api';

function* fetchMusic(action) {
  try {
    const data = yield call(apiMusic);
    yield put({ type: FETCH_MUSIC_SUCCESS, data })
  } catch (error) {
    yield put({ type: FETCH_MUSIC_FAILURE })
  }
}

function* musicSaga () {
  yield takeEvery(FETCH_MUSIC, fetchMusic)
}

export default musicSaga;
