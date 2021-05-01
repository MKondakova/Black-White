import { REG_ERROR, LOGIN_ERROR } from "./types";

const initialState = {
  data: {},
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};
