import { combineReducers } from "redux";
import authReducer from "./authReducers";
import { usersReducer } from "./usersReducers";
import { writeMessageReducer, messagesListReducer } from "./messagesReducers";

export default combineReducers({
  auth: authReducer,
  writeMessage: writeMessageReducer,
  messages: messagesListReducer,
  users: usersReducer,
});
