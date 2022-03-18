import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';

const initialState = {
  user: {
    email: '',
    password: '',
    name: '',
  },
  successReg: false,
  successAuth: false,
};

export const fetchNewUser = createAsyncThunk('user/fetchNewUser', async (info) => {
  const response = await auth.registration(info);
  console.log(response);
  return response;
});

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (info, token) => {
  const response = await auth.authorization(info, token);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        // console.log(payload.message);
        return state;
      })
      .addCase(fetchNewUser.fulfilled, (state, { payload }) => {
        console.log(111);
        console.log(payload);
      })
      .addCase(fetchNewUser.rejected, (state, { payload }) => {
        console.log(payload.message);
      });

    builder
      .addCase(fetchAuth.pending, (state) => state)
      .addCase(fetchAuth.fulfilled, ({ payload }) => console.log(payload))
      .addCase(fetchAuth.rejected, ({ payload }) => console.log(payload));
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
