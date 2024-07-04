import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = "";

export const activeChatId = createSlice({
  name: "activeChatId",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getActiveChatId: (state) => {
      return state;
    },
    setActiveChatId: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { getActiveChatId, setActiveChatId } = activeChatId.actions;
export default activeChatId.reducer;
