import api from "../../apiService";
import * as types from "../constants/authConstants";

const setLoading = () => (dispatch) => dispatch({ type: types.SET_LOADING });

const getUser = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST });
  try {
    const { data } = await api.get("/users/me");
    dispatch({ type: types.GET_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.error(error.msg);
    dispatch({ type: types.GET_USER_FAIL, payload: error.msg });
  }
};

const editUser = (id, user) => async (dispatch) => {
  console.log(user);
  dispatch({ type: types.EDIT_USER_REQUEST });
  try {
    const { data } = await api.put(`/users/${id}`, user);
    dispatch({ type: types.EDIT_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.error(error.msg);
    dispatch({ type: types.EDIT_USER_FAIL, payload: error.msg });
  }
};

const register = (values) => async (dispatch) => {
  setLoading();
  try {
    const res = await api.post("/users", values);
    if (res.status === 200) dispatch({ type: types.REGISTER_SUCCESS });
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.error(error.msg);
    dispatch({ type: types.REGISTER_FAIL, payload: error.msg });
  }
};
const login = (values) => async (dispatch) => {
  setLoading();
  try {
    const res = await api.post("/auth", values);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.msg });
    console.error(error);
  }
};
const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: types.LOGOUT });
};

const authActions = { register, editUser, login, logout, getUser };

export default authActions;
