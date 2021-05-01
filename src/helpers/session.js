export const getToken = () => localStorage.getItem('GoGameToken');

export const setToken = (token) => localStorage.setItem("GoGameToken", token);

export const removeToken = () => localStorage.removeItem("GoGameToken");

export const isAuth = () => Boolean(getToken());