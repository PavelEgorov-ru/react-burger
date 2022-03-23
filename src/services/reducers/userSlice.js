import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import { getCookie, setCookie } from '../../utils/cookie';

const initialState = {
  user: {
    email: '',
    password: '',
    name: '',
  },
  successReg: false,
  successAuth: false,
  error: '',
  loader: false,
};

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    console.log('запрос');
    try {
      const response = await auth.registration(info);
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        return rejectWithValue(responseData.message);
      }
      return responseData;
    } catch (res) {
      console.log({ res });
    }
  }
);

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (info, { rejectWithValue }) => {
  try {
    console.log(info);
    const response = await auth.authorization(info, getCookie('token'));
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData.message);
      return rejectWithValue(responseData.message);
    }
    return responseData;
  } catch (res) {
    console.log({ res });
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchNewUser.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successReg = payload.success;
        state.user.email = payload.user.email;
        state.user.name = payload.user.name;
        state.user.password = payload.user.password;
        setCookie('token', payload.accessToken);
        localStorage.setItem('reftoken', payload.refreshToken);
      })
      .addCase(fetchNewUser.rejected, (state, { payload }) => {
        console.log(payload);
        state.error = payload;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successAuth = true;
        setCookie('token', payload.accessToken);
        localStorage.setItem('reftoken', payload.refreshToken);
      })
      .addCase(fetchAuth.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
