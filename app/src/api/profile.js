import { GET } from "./base";

export const getProfile = (token) => {
  return GET(`user/profile?token=${token}`, {}, token);
};

export const getProfileById = (token, id) => {
  return GET(`user/${id}/profile?id=${id}&token=${token}`, {}, token);
};

export const getSgf = (id) => {
  return GET(`game/sgf/${id}?id=${id}`, {});
};

export const getFullLog = (id) => {
  return GET(`game/full-log/${id}?id=${id}`, {});
};

export const getLiders = (token) => {
  return GET(`leaderboard?token=${token}`, {}, token);
};
