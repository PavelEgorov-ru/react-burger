import { setCookie } from '../../utils/cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';

const initialState = {
  user: {},
  refreshToken: '',
  success: false,
};

export const fetchNewUser = createAsyncThunk('user/fetchNewUser', async (info) => {
  const response = await auth.registration(info);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: {
    [fetchNewUser.pending]: (state) => state,
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.refreshToken = payload.refreshToken;
      state.success = payload.success;
      setCookie('token', payload.accessToken);
    },
    [fetchNewUser.rejected]: (state) => {
      state.success = false;
    },
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
