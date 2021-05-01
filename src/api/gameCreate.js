import { POST, GET } from "./base";

export const createCode = (token) => {
  return POST(`game/create/code?token=${token}`, {}, token);
};

export const joinGameWithCode = (code, token) => {
  return POST(`game/join/${code}?token=${token}&code=${code}`, {}, token);
};

export const createRandomGame = (token) => {
  return POST(`game/create/random?token=${token}`, {}, token);
};

export const createGameWithAi = (token) => {
  return POST(`game/create/bot?token=${token}`, {}, token);
};

export const getCurrentGame = (token) => {
  return GET(`game/current?token=${token}`, {}, token);
}
