import {all, takeLatest, call, put} from 'redux-saga/effects';
import {registration,login} from "../../api/auth";
import { setToken } from '../../helpers/session';
import { REG_SUBMIT, REG_ERROR, LOGIN_ERROR,LOGIN_SUBMIT } from "./types";
import history from '../../history'

function* fetchReg_saga(action) {
  const {payload} = action;
  try {
    yield put({ type: REG_ERROR, error: {}});
    const res = yield call(registration, payload.nickname, payload.email)
    if(res.errors) {
      yield put({ type:REG_ERROR, error: res.errors})
    }
    if(res.token) {
      yield put({ type: REG_ERROR, error: {}});
      setToken(res.token);
      window.location.assign('/')
    }
  } catch (e) {
    yield put({type: REG_ERROR, error: e});
    //throw e;
  }
}

function* fetchLogin_saga(action) {
  const {payload} = action;
  try {
    yield put({ type: LOGIN_ERROR, error: {}});
    const res = yield call(login, payload.password, payload.email)
    if(res.errors) {
      yield put({ type:LOGIN_ERROR, error: res.errors})
    }
    if(res.token) {
      yield put({ type: LOGIN_ERROR, error: {}});
      setToken(res.token);
      window.location.assign('/')
    }
  } catch (e) {
    yield put({type: LOGIN_ERROR, error: e});
    //throw e;
  }
}

export function* authSaga() {
  yield all([
    takeLatest(REG_SUBMIT, fetchReg_saga),
    takeLatest(LOGIN_SUBMIT, fetchLogin_saga)
  ])
}
