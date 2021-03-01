import api from "../../apiService";
import * as types from "../constants/authConstants";

const setLoading = () => (dispatch) => dispatch({ type: types.SET_LOADING });
const register = (values) => async (dispatch) => {
  setLoading();
  try {
    const res = await api.post("/users", values);
    if (res.status === 200) dispatch({ type: types.REGISTER_SUCCESS });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.REGISTER_FAIL, payload: error.message });
  }
};
const login = (values) => async (dispatch) => {
  setLoading();
  try {
    const res = await api.post("/auth", values);
    if (res.status === 200)
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
  }
};
const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: types.LOGOUT });
};

const authActions = { register, login, logout };

export default authActions;
