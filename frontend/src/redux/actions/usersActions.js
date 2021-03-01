import * as types from "../constants/usersConstants";
import api from "../../apiService";

const editUser = (id, user) => async (dispatch) => {
  console.log(user);
  dispatch({ type: types.EDIT_USER_REQUEST });
  try {
    const { data } = await api.put(`/users/${id}`, user);
    dispatch({ type: types.EDIT_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.EDIT_USER_FAIL, payload: error.message });
  }
};
const usersActions = {
  editUser,
};

export default usersActions;
