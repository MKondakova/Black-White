import { all, takeLatest, call, put } from "redux-saga/effects";
import { getProfile, getProfileById, getLiders, getSgf, getFullLog } from "../../api/profile";
import { getToken } from "../../helpers/session";
import { GET_PROFILE, PROFILE_INFO, GET_PROFILE_BY_ID, GET_SGF, GET_FULL_LOG, PROFILE_BY_ID_INFO, SET_LIDERS, GET_LIDERS } from "./types";

function* fetchGetProfile_saga() {
  try {
    const res = yield call(getProfile, getToken());
    yield put({type: PROFILE_INFO, payload: res})
  } catch (e) {
    // throw e;
  }
}

function* fetchGetSgf_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(getSgf, payload.id);
    window.location.assign(res.file)
  } catch (e) {
    // throw e;
  }
}

function* fetchGetFullLog_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(getFullLog, payload.id);
    window.location.assign(res.file)
  } catch (e) {
    // throw e;
  }
}

function* fetchGetProfileById_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(getProfileById, getToken(), payload.id);
    yield put({type: PROFILE_BY_ID_INFO, payload: res})
  } catch (e) {
    // throw e;
  }
}

function* fetchGetLidersBoard_saga() {
  try {
    const res = yield call(getLiders, getToken());
    yield put({type: SET_LIDERS, payload: res})
  } catch (e) {
    // throw e;
  }
}

export function* profileSaga() {
  yield all([
    takeLatest(GET_PROFILE, fetchGetProfile_saga),
    takeLatest(GET_SGF, fetchGetSgf_saga),
    takeLatest(GET_FULL_LOG, fetchGetFullLog_saga),
    takeLatest(GET_LIDERS, fetchGetLidersBoard_saga),
    takeLatest(GET_PROFILE_BY_ID, fetchGetProfileById_saga),
  ]);
}
