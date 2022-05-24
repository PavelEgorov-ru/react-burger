import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import { setCookie } from '../../utils/cookie';

const initialState = {
  isAuth: false,
  loader: false,
  userName: '',
  userEmail: '',
  userPassword: '',
  errorMessage: '',
};

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.register(info);
      const responseData = response.json();
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
    const response = await auth.login(info);
    const responseData = response.json();
    if (!response.ok) {
      // console.log(responseData.message);
      return rejectWithValue(responseData.message);
    }
    return responseData;
  } catch (res) {
    console.log({ res });
  }
});

export const fetchCheckUser = createAsyncThunk('user/fetchCheckUser', async () => {
  try {
    const response = await auth.checkUser();
    // console.log(response);
    const responseData = response.json();
    // if (!response.ok) {
    //   return rejectWithValue(responseData.message);
    // }
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
        // console.log(payload);
        setCookie('burgerToken', payload.accessToken);
        localStorage.setItem('refBurgerToken', payload.refreshToken);
      })
      .addCase(fetchNewUser.rejected, (state, { payload }) => {
        // console.log(payload);
        state.errorMessage = payload;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loader = false;
        // state.isAuth = true;
      })
      .addCase(fetchAuth.rejected, (state, { payload }) => {
        // console.log(payload);
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(fetchCheckUser.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(fetchCheckUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loader = false;
        state.isAuth = payload.success;
      })
      .addCase(fetchCheckUser.rejected, (state, { payload }) => {
        // console.log(payload);
        state.loader = true;
      });
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
