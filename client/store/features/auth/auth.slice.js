/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  loginWithAccessToken,
  loginWithEmailPass,
  logoutFromSession,
  signUp,
} from './auth.thunk';

const initialState = {
  isValidatingUser: false,
  loggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmailPass.pending, (state) => {
        state.isValidatingUser = true;
        state.loggedIn = false;
      })
      .addCase(loginWithEmailPass.fulfilled, (state, action) => {
        state.isValidatingUser = false;
        state.loggedIn = true;
        state.user = action.payload.userInfo;
      })
      .addCase(loginWithEmailPass.rejected, (state) => {
        state.isValidatingUser = false;
        state.loggedIn = false;
      })
      .addCase(loginWithAccessToken.pending, (state) => {
        state.isValidatingUser = true;
        state.loggedIn = false;
      })
      .addCase(loginWithAccessToken.fulfilled, (state, action) => {
        state.isValidatingUser = false;
        state.loggedIn = true;
        state.user = action.payload.userInfo;
      })
      .addCase(loginWithAccessToken.rejected, (state) => {
        state.isValidatingUser = false;
        state.loggedIn = false;
      })
      .addCase(logoutFromSession.fulfilled, (state) => {
        state.loggedIn = false;
        state.user = null;
      })
      .addCase(signUp.pending, (state) => {
        state.isValidatingUser = true;
        state.loggedIn = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isValidatingUser = false;
        state.loggedIn = true;
        state.user = action.payload.userInfo;
      })
      .addCase(signUp.rejected, (state) => {
        state.isValidatingUser = false;
        state.loggedIn = false;
      });
  },
});

export const selectLoggedInUser = (state) => state?.auth?.user;
export const selectIsLoggedIn = (state) => state?.auth?.loggedIn;
export const selectIsValidatingUser = (state) => state?.auth?.isValidatingUser;

export default authSlice.reducer;
