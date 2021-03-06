import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import resetApi from '../../utils/resetApi';
import { setCookie, deleteCookie } from '../../utils/cookie';

const initialState = {
  isAuth: false,
  isLoader: true,
  isForgot: false,
  isReset: false,
  userName: '',
  userEmail: '',
  userPassword: '',
  errorMessage: '',
};

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    const response = await auth.register(info);
    const responseData = response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (info, { rejectWithValue }) => {
  const response = await auth.login(info);
  const responseData = response.json();
  if (!response.ok) {
    return rejectWithValue(responseData.message);
  }
  return responseData;
});

export const fetchLogout = createAsyncThunk(
  'user/fetchLogout',
  async (info, { rejectWithValue }) => {
    const response = await auth.logout(info);
    const responseData = response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

export const fetchCheckUser = createAsyncThunk('user/fetchCheckUser', async (refToken) => {
  const response = await auth.checkUser();
  const responseData = await response.json();
  if (responseData.message === 'jwt expired') {
    const check = await auth.newToken({ token: refToken });
    const checkData = await check.json();
    setCookie('burgerToken', checkData.accessToken);
    localStorage.setItem('refBurgerToken', checkData.refreshToken);
    if (checkData.success === true) {
      const response = await auth.checkUser();
      const newResponseData = await response.json();
      return newResponseData;
    }
  }
  return responseData;
});

export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async (info, { rejectWithValue }) => {
    const response = await auth.editUser(info);
    const responseData = response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  async (info, { rejectWithValue }) => {
    const response = await resetApi.forgotPassword(info);
    const responseData = response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

export const fetchResetPassword = createAsyncThunk(
  'user/fetchResetPassword',
  async (info, { rejectWithValue }) => {
    const response = await resetApi.resetPassword(info);
    const responseData = response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    endLoader(state) {
      state.isLoader = true;
    },
    defaultReset(state) {
      state.isReset = false;
      state.isForgot = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewUser.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchNewUser.fulfilled, (state, { payload }) => {
        setCookie('burgerToken', payload.accessToken);
        localStorage.setItem('refBurgerToken', payload.refreshToken);
        state.userName = payload.user.name;
        state.userEmail = payload.user.email;
        state.userPassword = payload.user.password;
        state.isLoader = true;
        state.isAuth = payload.success;
      })
      .addCase(fetchNewUser.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        setCookie('burgerToken', payload.accessToken);
        localStorage.setItem('refBurgerToken', payload.refreshToken);
        state.isLoader = true;
        state.isAuth = payload.success;
        state.userName = payload.user.name;
        state.userEmail = payload.user.email;
        state.userPassword = payload.user.password;
      })
      .addCase(fetchAuth.rejected, (state, { payload }) => {
        state.isLoader = true;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchLogout.fulfilled, (state, { payload }) => {
        deleteCookie('burgerToken');
        localStorage.removeItem('refBurgerToken');
        state.isLoader = true;
        state.isAuth = false;
        state.userName = '';
        state.userEmail = '';
        state.userPassword = '';
      })
      .addCase(fetchLogout.rejected, (state, { payload }) => {
        state.isLoader = true;
      })
      .addCase(fetchCheckUser.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchCheckUser.fulfilled, (state, { payload }) => {
        state.userName = payload.user.name;
        state.userEmail = payload.user.email;
        state.isLoader = true;
        state.isAuth = payload.success;
      })
      .addCase(fetchCheckUser.rejected, (state, { payload }) => {
        state.isLoader = true;
      })
      .addCase(fetchEditUser.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchEditUser.fulfilled, (state, { payload }) => {
        state.userName = payload.user.name;
        state.userEmail = payload.user.email;
        state.isLoader = true;
      })
      .addCase(fetchEditUser.rejected, (state, { payload }) => {
        state.isLoader = true;
      })
      .addCase(fetchForgotPassword.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, { payload }) => {
        state.isLoader = true;
        state.isForgot = true;
      })
      .addCase(fetchForgotPassword.rejected, (state, { payload }) => {
        state.isLoader = true;
      })
      .addCase(fetchResetPassword.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state, { payload }) => {
        state.isLoader = true;
        state.isReset = true;
        state.isForgot = false;
      })
      .addCase(fetchResetPassword.rejected, (state, { payload }) => {
        state.isLoader = true;
      });
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
