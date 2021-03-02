import * as types from "../constants/messagesConstants";
const initialState = { message: {}, error: null, loading: false };

export const writeMessageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_LOADING:
      return { ...state, loading: true };
    case types.WRITE_MESSAGE_SUCCESS:
      return { ...state, loading: false };
    case types.WRITE_MESSAGE_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export const messagesListReducer = (
  state = { messagesList: [], filtered: {}, createdFlag: false, loading: true },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesList: payload,
        filterFlag: false,
        loading: false,
      };
    case types.GET_MESSAGES_FAIL:
      return { ...state, error: payload, loading: false };
    case types.GET_DELETED_MESSAGES_SUCCESS:
      return { ...state, messagesList: payload, loading: false };
    case types.WRITE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case types.WRITE_MESSAGE_SUCCESS:
      return { ...state, loading: false, createdFlag: !state.createdFlag };
    case types.WRITE_MESSAGE_FAIL:
      return { ...state, error: payload, loading: false };
    case types.GET_MESSAGE_REQUEST:
      return { ...state, loading: false };
    case types.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        selectedMessage: payload,
        messagesList: state.messagesList.map((mes) =>
          mes._id === payload._id ? { ...mes, status: "seen" } : mes
        ),
      };
    case types.GET_MESSAGE_FAIL:
      return { ...state, loading: false, error: payload };
    case types.EDIT_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case types.EDIT_MESSAGE_SUCCESS:
      console.log(payload);
      return {
        ...state,
        messagesList: state.messagesList.map((mes) =>
          mes._id === payload._id ? payload : mes
        ),
        loading: false,
      };
    case types.EDIT_MESSAGE_FAIL:
      return { ...state, loading: false };
    case types.DELETE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messagesList: state.messagesList.filter(
          (message) => message._id !== payload
        ),
      };
    case types.DELETE_MESSAGE_FAIL:
      return { ...state, error: payload, loading: false };
    case types.FILTER_MESSAGES:
      console.log(payload);
      return {
        ...state,
        filterFlag: true,
        filtered: payload
          ? state.messagesList.filter((mess) => mess.status === "seen")
          : state.messagesList.filter((mess) => mess.status === "unseen"),
      };

    default:
      return state;
  }
};
