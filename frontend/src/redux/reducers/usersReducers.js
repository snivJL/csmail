import * as types from "../constants/usersConstants";
const initialState = { user: {}, error: null, loading: false };

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.EDIT_USER_REQUEST:
      return { ...state, loading: true };
    case types.EDIT_USER_SUCCESS:
      return { ...state, loading: false, user: payload };
    case types.EDIT_USER_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
