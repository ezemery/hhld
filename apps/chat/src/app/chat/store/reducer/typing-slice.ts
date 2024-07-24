import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = "";

export const typing = createSlice({
  name: "typing",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getTypingState: (state) => {
      return state;
    },
    setTypingState: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { getTypingState, setTypingState } = typing.actions;
export default typing.reducer;
