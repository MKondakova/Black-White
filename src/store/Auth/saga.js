import {all, takeLatest, call, put} from 'redux-saga/effects';
import {registration,login} from "../../api/auth";
import { setToken } from '../../helpers/session';
import { REG_SUBMIT, REG_ERROR, LOGIN_ERROR,LOGIN_SUBMIT } from "./types";

function* fetchReg_saga(action) {
  const {payload} = action;
  try {
    const res = yield call(registration, payload.nickname, payload.email)
    if(res.error) {
      yield put({ type:REG_ERROR, error: res.error})
    }
    if(res.token) {
      setToken(res.token);
      window.location.assign('/')
    }
  } catch (e) {
    yield put({type: REG_ERROR, error: e.toStrind()});
  }
}

function* fetchLogin_saga(action) {
  const {payload} = action;
  try {
    const res = yield call(login, payload.password, payload.email)
    if(res.error) {
      yield put({ type:LOGIN_ERROR, error: res.error})
    }
    if(res.token) {
      setToken(res.token);
      window.location.assign('/')
    }
  } catch (e) {
    yield put({type: LOGIN_ERROR, error: e.toStrind()});
  }
}

export function* authSaga() {
  yield all([
    takeLatest(REG_SUBMIT, fetchReg_saga),
    takeLatest(LOGIN_SUBMIT, fetchLogin_saga)
  ])
}
