import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MessageType {
  [key: string]: { [key: string]: any }[];
};
// Define the initial state using that type
const initialState: MessageType = {};

export const messageSlice = createSlice({
  name: "message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMessageState: (state) => {
      return state;
    },

    setMessageState: (
      state: MessageType,
      action: PayloadAction<{
        senderId: string;
        message: string;
        receiverId: string;
      }>,
    ) => {
      const { senderId, receiverId } = action.payload;
      const id = senderId + "/" + receiverId;
      const msg = state[id];
      if (msg) {
        msg.push(action.payload);
      } else {
        state[id] = [action.payload];
      }
      //builds a new state and adds the previous messages plus the new message
      return state;
    },
    setWebsocketMessageState: (
      state: MessageType,
      action: PayloadAction<{
        senderId: string;
        message: string;
        receiverId: string;
      }>,
    ) => {
      const { senderId, receiverId } = action.payload;
      const id = receiverId + "/" + senderId;
      const msg = state[id];
      if (msg) {
        msg.push(action.payload);
      } else {
        state[id] = [action.payload];
      }
      //builds a new state and adds the previous messages plus the new message
      return state;
    },
    setApiMessageState: (
      state: MessageType,
      action: PayloadAction<{
        senderId: string;
        message: { [key: string]: any }[];
        receiverId: string;
      }>,
    ) => {
      const { message, senderId, receiverId } = action.payload;
      const id = senderId + "/" + receiverId;
      // const msg = state[id];
      state[id] = message;
      //builds a new state and adds the previous messages plus the new message
      return state;
    },
  },
});

export const {
  getMessageState,
  setMessageState,
  setWebsocketMessageState,
  setApiMessageState,
} = messageSlice.actions;

export default messageSlice.reducer;
