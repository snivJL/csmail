import * as types from "../constants/usersConstants";
const initialState = { user: {}, error: null, loading: false };

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
