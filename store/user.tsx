import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import UserType from "../types/user";

const initialState: UserType = {
  token: null,
  // tokenExpiration: null,
  icon: null,
  name: null,
  emailAddress: null,
  confirmedEmail: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    LOG_USER_IN: (state: UserType, action: PayloadAction<UserType>) => {
      state.token = action.payload.token;
      state.icon = action.payload.icon;
      state.name = action.payload.name;
      state.emailAddress = action.payload.emailAddress;
      state.confirmedEmail = action.payload.confirmedEmail;
    },

    LOG_USER_OUT: (state: UserType) => {
      state = {
        token: null,
        // tokenExpiration: null,
        icon: null,
        name: null,
        emailAddress: null,
        confirmedEmail: null,
      };
    },

    REFRESH_USER_DATA: (state: UserType, action: PayloadAction<UserType>) => {
      state.icon = action.payload.icon;
      state.name = action.payload.name;
      state.emailAddress = action.payload.emailAddress;
      state.confirmedEmail = action.payload.confirmedEmail;
    },

    UPDATE_NAME: (state: UserType, action) => {
      state.name = action.payload.name;
    },

    UPDATE_ICON: (state: UserType, action) => {
      state.icon = action.payload.icon;
    },
  },
});

export const {
  LOG_USER_IN,
  LOG_USER_OUT,
  REFRESH_USER_DATA,
  UPDATE_NAME,
  UPDATE_ICON,
} = counterSlice.actions;

export default counterSlice.reducer;
