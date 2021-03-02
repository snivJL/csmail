import * as types from "../constants/messagesConstants";
import api from "../../apiService";

const setLoading = () => (dispatch) => dispatch({ type: types.SET_LOADING });

const writeMessage = (message) => async (dispatch) => {
  message.from = localStorage.getItem("userID");
  dispatch({ type: types.WRITE_MESSAGE_REQUEST });
  try {
    await api.post("/messages", message);
    dispatch({ type: types.WRITE_MESSAGE_SUCCESS, payload: message });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.WRITE_MESSAGE_FAIL });
  }
};

const getMessages = () => async (dispatch) => {
  dispatch({ type: types.GET_MESSAGES_REQUEST });
  try {
    const { data } = await api.get("/messages");

    dispatch({
      type: types.GET_MESSAGES_SUCCESS,
      payload: data.messages.reverse().filter((mess) => !mess.isDeleted),
    });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.GET_MESSAGES_FAIL, payload: error.message });
  }
};

const getDeletedMessages = () => async (dispatch) => {
  dispatch({ type: types.GET_MESSAGES_REQUEST });
  try {
    const { data } = await api.get("/messages");
    const deletedMessages = data.messages
      .reverse()
      .filter((mess) => mess.isDeleted);
    dispatch({
      type: types.GET_DELETED_MESSAGES_SUCCESS,
      payload: deletedMessages,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.GET_MESSAGES_FAIL, payload: error.message });
  }
};

const getSingleMessage = (id) => async (dispatch) => {
  dispatch({ type: types.GET_MESSAGE_REQUEST });
  try {
    const { data } = await api.get(`/messages/${id}`);
    dispatch({ type: types.GET_MESSAGE_SUCCESS, payload: data.message });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.GET_MESSAGE_FAIL, payload: error.message });
  }
};

const deleteMessage = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_MESSAGE_REQUEST });
  try {
    await api.delete(`/messages/${id}`);
    dispatch({ type: types.DELETE_MESSAGE_SUCCESS, payload: id });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.DELETE_MESSAGE_FAIL, payload: error.message });
  }
};

const editMessage = (id, message) => async (dispatch) => {
  console.log(message);
  dispatch({ type: types.EDIT_MESSAGE_REQUEST });
  try {
    const { data } = await api.put(`/messages/${id}`, message);
    console.log("DATA", data.message);
    dispatch({ type: types.EDIT_MESSAGE_SUCCESS, payload: data.message });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: types.EDIT_MESSAGE_FAIL, payload: error.message });
  }
};

const filterMessages = (bool) => (dispatch) => {
  dispatch({ type: types.FILTER_MESSAGES, payload: bool });
};

const messagesActions = {
  writeMessage,
  getMessages,
  getSingleMessage,
  deleteMessage,
  filterMessages,
  editMessage,
  getDeletedMessages,
};

export default messagesActions;
