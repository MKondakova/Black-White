import { REG_SUBMIT, LOGIN_SUBMIT } from "./types";

export const regSubmit = (nickname, email) => ({
  type: REG_SUBMIT,
  payload: { nickname, email },
});

export const loginSubmit = (password, email) => ({
  type: LOGIN_SUBMIT,
  payload: { password, email },
});