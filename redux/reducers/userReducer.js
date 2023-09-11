import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";

let { create_user, read_users, update_user } = userActions;

let initialState = {
  users: []
};

const userReducer = createReducer(initialState, (builder) => builder
  .addCase(create_user.fulfilled, (state, action) => {
    state.users.push(action.payload);
  })
  .addCase(read_users.fulfilled, (state, action) => {
    state.users = action.payload;
  })
  .addCase(update_user.fulfilled, (state, action) => {
    const updatedUserIndex = state.users.findIndex(user => user._id === action.payload._id);
    if (updatedUserIndex !== -1) {
      state.users[updatedUserIndex] = action.payload;
    }
  })
);

export default userReducer;
