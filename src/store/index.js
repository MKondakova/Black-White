import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./Auth/reducers";
import { storyStart } from "../store/sagas";
import { boardReducer } from "./Board/reducers";
import { profileReducer } from "./Profile/reducers";
import { createGameReducer } from "./GameCreate/reducers";

export const createReduxStore = () => {
  const reducer = combineReducers({
    auth: authReducer,
    board: boardReducer,
    profile: profileReducer,
    createGame: createGameReducer
  });
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = createStore(reducer, compose(applyMiddleware(...middleware)));
  sagaMiddleware.run(storyStart);
  return store;
};
