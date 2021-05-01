import { POST } from "./base";

export const registration = (nickname, email) => {
  return POST(`user/register?email=${email}&nickname=${nickname}`, {
    nickname,
    email,
  });
};

export const login = (password, email) => {
  return POST(`user/login?email=${email}&password=${password}`, {
    password,
    email,
  });
};