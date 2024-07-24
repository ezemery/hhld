import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Contacts = {
  email?: string;
  _id?: string;
}[];
// Define the initial state using that type
const initialState: Contacts = [];

export const contacts = createSlice({
  name: "contacts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getContactsState: (state) => {
      return state;
    },
    setContactState: (state, action: PayloadAction<Contacts>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { getContactsState, setContactState } = contacts.actions;
export default contacts.reducer;
