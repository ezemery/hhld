import { combineReducers } from "@reduxjs/toolkit";
import activeChatId from "./active-chat-slice";
import typing from "./typing-slice";
import message from "./message-slice";

const rootReducer = combineReducers({
  activeChatId,
  typing,
  message,
});
export default rootReducer;
