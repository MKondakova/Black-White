import {
  CREATE_GAME_SUCCESS, CREATE_GAME_ERROR,
  JOIN_GAME_WITH_CODE_SUCCESS, JOIN_GAME_WITH_CODE_ERROR,
  CREATE_RANDOM_GAME_SUCCESS, CREATE_RANDOM_GAME_ERROR,
  CREATE_GAME_WITH_AI_SUCCESS, CREATE_GAME_WITH_AI_ERROR,
  CLEAR_GAME } from "./types";

const initialState = {
  code: '',
  id: null,
  gameId: null,
  message: '',
  error: null,
};

export const createGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        code: action.payload.code,
        id: action.payload.gameId,
      };
    case CREATE_GAME_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case JOIN_GAME_WITH_CODE_SUCCESS:
      return {
        ...state,
        id: action.payload,
      };
    case JOIN_GAME_WITH_CODE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_RANDOM_GAME_SUCCESS:
      return {
        ...state,
        id: action.payload,
      };
    case CREATE_RANDOM_GAME_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_GAME_WITH_AI_SUCCESS:
      return {
        ...state,
        id: action.payload,
      };
    case CREATE_GAME_WITH_AI_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_GAME:
      return {
        ...state,
        id: null,
        code: null,
        message: null,
        error: null
      }
    default:
      return { ...state };
  }
};
