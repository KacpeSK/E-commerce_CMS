import { createSlice } from "@reduxjs/toolkit";

// import { USER_ACTION_TYPES } from "./user.types";

//Setting initial state
const INITIAL_STATE = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      // even thou it looks like a mutation, under the hood it returns a new state
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
