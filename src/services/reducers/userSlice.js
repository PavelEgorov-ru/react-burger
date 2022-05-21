import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import { getCookie, setCookie } from '../../utils/cookie';

const initialState = {
  error: '',
};

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.registration(info);
      const responseData = await response.json();
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
