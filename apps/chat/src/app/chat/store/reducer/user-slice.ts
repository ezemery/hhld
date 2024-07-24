import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email?: string;
  _id?: string;
}
// Define the initial state using that type
const initialState: User = {};

export const user = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserState: (state) => {
      return state;
    },
    setUserState: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { getUserState, setUserState } = user.actions;
export default user.reducer;
