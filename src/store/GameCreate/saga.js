import { all, takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "../../helpers/session";
import {
  CREATE_GAME_CODE, CREATE_GAME_ERROR, CREATE_GAME_SUCCESS,
  JOIN_GAME_WITH_CODE, JOIN_GAME_WITH_CODE_ERROR, JOIN_GAME_WITH_CODE_SUCCESS,
  CREATE_RANDOM_GAME, CREATE_RANDOM_GAME_ERROR, CREATE_RANDOM_GAME_SUCCESS,
  CREATE_GAME_WITH_AI, CREATE_GAME_WITH_AI_ERROR, CREATE_GAME_WITH_AI_SUCCESS,
  GET_CURRENT_GAME } from "./types";
import { createCode, joinGameWithCode, createRandomGame, createGameWithAi, getCurrentGame } from "../../api/gameCreate";

import history from '../../history'

function* fetchCreateGameCode_saga() {
  try {
    yield put({ type: CREATE_GAME_ERROR, error: {} });
    const res = yield call(createCode, getToken());
    if (res.code) {
      yield put({ type: CREATE_GAME_ERROR, error: {} });
      window.GAME_ID = res.gameId;
      window.CAN_MAKE_MOVE = true;
      window.BEST_MOVE_GRID_I = undefined;
      yield put({ type: CREATE_GAME_SUCCESS, payload: {code: res.code, gameId: res.gameId}})
    }
  } catch (e) {
    yield put({ type: CREATE_GAME_ERROR, error: e });
    // throw e;
  }
}

function* fetchJoinGameWithCode_saga(action) {
  const { payload } = action;
  try {
    yield put({ type: JOIN_GAME_WITH_CODE_ERROR, error: {} });
    const res = yield call(joinGameWithCode, payload.code, getToken());
    if (res.id) {
      yield put({ type: JOIN_GAME_WITH_CODE_ERROR, error: {} });
      window.GAME_ID = res.id;
      window.CAN_MAKE_MOVE = true;
      window.BEST_MOVE_GRID_I = undefined;
     yield put({ type: JOIN_GAME_WITH_CODE_SUCCESS, payload: res.id})
      history.push('/gameBoard')
    } else {
      alert(res.message)
    }
  } catch (e) {
    yield put({ type: JOIN_GAME_WITH_CODE_ERROR, error: e });
    // throw e;
  }
}

function* fetchCreateRandomGame_saga() {
  try {
    yield put({ type: CREATE_RANDOM_GAME_ERROR, error: {} });
    const res = yield call(createRandomGame, getToken());
    if (res.gameId) {
      yield put({ type: CREATE_RANDOM_GAME_ERROR, error: {} });
      window.GAME_ID = res.gameId;
      window.CAN_MAKE_MOVE = true;
      window.BEST_MOVE_GRID_I = undefined;
      yield put({ type: CREATE_RANDOM_GAME_SUCCESS, payload: res.gameId})
    }
  } catch (e) {
    yield put({ type: CREATE_RANDOM_GAME_ERROR, error: e });
    // throw e;
  }
}

function* fetchCreateGameWithAi_saga() {
  try {
    yield put({ type: CREATE_GAME_WITH_AI_ERROR, error: {} });
    const res = yield call(createGameWithAi, getToken());
    if (res.gameId) {
      yield put({ type: CREATE_GAME_WITH_AI_ERROR, error: {} });
      window.GAME_ID = res.gameId;
      window.CAN_MAKE_MOVE = true;
      window.BEST_MOVE_GRID_I = undefined;
      yield put({ type: CREATE_GAME_WITH_AI_SUCCESS, payload: res.gameId})
      history.push('/gameBoard')
    }
  } catch (e) {
    yield put({ type: CREATE_GAME_WITH_AI_ERROR, error: e });
    // throw e;
  }
}

function* fetchGetCurrentGame_saga() {
  try {
    const res = yield call(getCurrentGame, getToken());
    if (res.gameId) {
      window.GAME_ID = res.gameId;
      window.CAN_MAKE_MOVE = true;
      window.BEST_MOVE_GRID_I = undefined;
      yield put({ type: JOIN_GAME_WITH_CODE_SUCCESS, payload: res.gameId})
    }
  } catch (e) {
    yield put({ type: CREATE_RANDOM_GAME_ERROR, error: e });
    // throw e;
  }
}

export function* gameCreateSaga() {
  yield all([
    takeLatest(CREATE_GAME_CODE, fetchCreateGameCode_saga),
    takeLatest(JOIN_GAME_WITH_CODE, fetchJoinGameWithCode_saga),
    takeLatest(CREATE_RANDOM_GAME, fetchCreateRandomGame_saga),
    takeLatest(CREATE_GAME_WITH_AI, fetchCreateGameWithAi_saga),
    takeLatest(GET_CURRENT_GAME, fetchGetCurrentGame_saga),
  ]);
}
