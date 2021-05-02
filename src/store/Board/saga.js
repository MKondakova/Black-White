import { all, takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "../../helpers/session";
import {
  SINGLE_HELP,
  GET_HINT_ATARI,
  GET_HINT_BEST_MOVES,
  GET_HINT_SHOW_BEST,
  GET_HINT_HEATMAP_FULL,
  GET_HINT_7x7,
  GET_HINT_HEATMAP_ZONE,
  GET_HINT_BATTLE_ROYALE,
  BATTLE_ROYALE_HELP,
  MAP_HELP,
  ATARI_HELP,
  _7x7_HELP,
  SCORES_WINNER,
  GET_SCORES_WINNER
} from "./types";
import {
  helpBestMoves,
  helpShowBest,
  helpHeatmapFull,
  help7x7,
  helpHeatmapZone,
  scoresWinner
} from "../../api/board";

function* fetchGetHintBestMoves_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpBestMoves, getToken(), payload.game_id, payload.count);
    if (res.hint) {
      let newObj = {};
      res.hint.forEach((key, i) => {
        newObj[key.move] = i + 1
      })
      yield put({ type: SINGLE_HELP, payload: newObj })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintBattleRoyale_saga(action) {
  const { payload } = action;
  try {
    if (window.BEST_MOVE_GRID_SIZE_I === undefined) {
      console.log('Получаю лучший ход');
      const res = yield call(helpBestMoves, getToken(), payload.game_id, 1);
      if (res.hint) {
        yield put({ type: BATTLE_ROYALE_HELP, payload: res.hint })
      }
    } else
      yield put({ type: BATTLE_ROYALE_HELP, payload: {} })
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintShowBest_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpShowBest, getToken(), payload.game_id, payload.moves);
    if (res.hint) {
      const newObj = {}
      newObj[res.hint] = 'circle'
      yield put({ type: SINGLE_HELP, payload: newObj })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapFull_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapFull, getToken(), payload.game_id);
    console.log('heatmap', res);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapZone_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(helpHeatmapZone, getToken(), payload.game_id, payload.isQuarter);
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: { zone: res.hint, isQuarter: payload.isQuarter } })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintAtari_saga(action) {
  const { payload } = action;
  try {
    yield put({ type: ATARI_HELP })
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHint_7x7_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(help7x7, getToken(), payload.game_id);
    if (res.hint) {
      yield put({ type: _7x7_HELP, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintScoresWinner_saga(action) {
  const { payload } = action;
  try {
    const res = yield call(scoresWinner, getToken(), payload.game_id);
    if (res.hint) {
      yield put({ type: SCORES_WINNER, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

export function* boardSaga() {
  yield all([
    takeLatest(GET_HINT_BEST_MOVES, fetchGetHintBestMoves_saga),
    takeLatest(GET_HINT_SHOW_BEST, fetchGetHintShowBest_saga),
    takeLatest(GET_HINT_ATARI, fetchGetHintAtari_saga),
    takeLatest(GET_HINT_7x7, fetchGetHint_7x7_saga),
    takeLatest(GET_HINT_BATTLE_ROYALE, fetchGetHintBattleRoyale_saga),
    takeLatest(GET_HINT_HEATMAP_FULL, fetchGetHintHeatmapFull_saga),
    takeLatest(GET_HINT_HEATMAP_ZONE, fetchGetHintHeatmapZone_saga),
    takeLatest(GET_SCORES_WINNER, fetchGetHintScoresWinner_saga),
  ]);
}
