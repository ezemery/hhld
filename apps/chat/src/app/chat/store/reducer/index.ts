import { combineReducers } from "@reduxjs/toolkit";
import activeChatId from "./activeChatSlice";
import typing from "./typingSlice";
import message from "./messageSlice";

const rootReducer = combineReducers({
  activeChatId,
  typing,
  message,
});
export default rootReducer;
