import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import AxiosConfig from '../../../constants/axiosConfig';

export const loginWithEmailPass = createAsyncThunk(
  'auth/loginWithEmailPass',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AxiosConfig.post('/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('accessToken', data.token);
      dispatch(push('/'));
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const loginWithAccessToken = createAsyncThunk(
  'auth/loginWithAccessToken',
  async (accessToken, { rejectWithValue }) => {
    try {
      const { data } = await AxiosConfig.post('/api/users/validateToken', {
        token: accessToken,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const logoutFromSession = createAsyncThunk(
  'auth/logoutFromSession',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AxiosConfig.post('/v1/auth/logout', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (signUpProfile, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await AxiosConfig.post(
        '/api/users/signup',
        signUpProfile,
      );
      localStorage.setItem('accessToken', data.token);
      dispatch(push('/'));
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
