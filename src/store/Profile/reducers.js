import { PROFILE_INFO, PROFILE_BY_ID_INFO, SET_LIDERS } from "./types";

const initialState = {
  userProfile: {},
  userByIdProfile: {},
  liders: []
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_INFO:
      return {
        ...state,
        userProfile: action.payload,
      };
    case PROFILE_BY_ID_INFO:
      return {
        ...state,
        userByIdProfile: action.payload,
      };
    case SET_LIDERS:
      return {
        ...state,
        liders: action.payload.leaderboard,
      };
    default:
      return { ...state };
  }
};
