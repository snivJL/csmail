import * as types from "../constants/authConstants";
const initialState = { user: {}, error: null, loading: false, isAuth: false };

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_LOADING:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAIL:
      return { ...state, error: payload, loading: false };
    case types.LOGIN_SUCCESS:
      return { ...state, user: payload.user, loading: false, isAuth: true };
    case types.LOGIN_FAIL:
      return { ...state, error: payload, loading: false };
    case types.GET_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_USER_SUCCESS:
      return { ...state, loading: false, user: payload };
    case types.GET_USER_FAIL:
      return { ...state, error: payload, loading: false };
    case types.LOGOUT:
      return { ...state, user: null, isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
