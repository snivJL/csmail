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
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userID", payload.user._id);

      return { ...state, user: payload.user, loading: false, isAuth: true };
    case types.LOGIN_FAIL:
      return { ...state, error: payload, loading: false };
    case types.LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
