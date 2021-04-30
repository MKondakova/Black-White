import { CREATE_GAME_CODE, CREATE_RANDOM_GAME, CREATE_GAME_WITH_AI, JOIN_GAME_WITH_CODE, GET_CURRENT_GAME, CLEAR_GAME  } from "./types";

export const createGameCode = () => ({
  type: CREATE_GAME_CODE,
});

export const joinGameWithCode = (code) => ({
  type: JOIN_GAME_WITH_CODE,
  payload: { code }
});

export const createRandomGame = () => ({
  type: CREATE_RANDOM_GAME,
});

export const createGameWithAi = () => ({
  type: CREATE_GAME_WITH_AI,
});

export const getCurrentGame = () => ({
  type: GET_CURRENT_GAME
});

export const clearGameId = () => ({
  type: CLEAR_GAME
});
