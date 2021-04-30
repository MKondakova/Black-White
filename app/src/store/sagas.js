import { all } from "redux-saga/effects";
import { authSaga } from "./Auth/saga";
import { boardSaga } from "./Board/saga";
import { gameCreateSaga } from "./GameCreate/saga";
import { profileSaga } from "./Profile/saga";

export function* storyStart() {
  yield all([authSaga(), profileSaga(), boardSaga(), gameCreateSaga()]);
}
