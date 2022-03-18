import { setCookie, getCookie } from '../../utils/cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';

const initialState = {
  user: {
    email: '',
    password: '',
    name: '',
  },
  success: false,
  accessToken: '',
};

export const fetchNewUser = createAsyncThunk('user/fetchNewUser', async (info) => {
  const response = await auth.registration(info);
  return response;
});

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (info, token) => {
  const response = await auth.authorization(info, token);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: {
    [fetchNewUser.pending]: (state) => state,
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.success = payload.success;
      setCookie('token', payload.accessToken);
      localStorage.setItem('reftoken', payload.refreshToken);
    },
    [fetchNewUser.rejected]: (state) => {
      state.success = false;
    },
    [fetchAuth.pending]: (state) => state,
    [fetchAuth.fulfilled]: (state, { payload }) => {
      state.success = payload.accessToken === getCookie('token');
    },
    [fetchAuth.rejected]: (state) => {
      state.success = false;
    },
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
