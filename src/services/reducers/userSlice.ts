import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import resetApi from '../../utils/resetApi';
import { setCookie, deleteCookie } from '../../utils/cookie';
import type {
  IStateUser,
  IResponseReject,
  IResponseRegister,
  IResponseSuccess,
  IResponseEditUser,
  IResponseCheckUser,
} from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IStateUser = {
  isAuth: false,
  isLoader: true,
  isForgot: false,
  isReset: false,
  userName: '',
  userEmail: '',
  errorMessage: '',
};

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    const response = await auth.register(info);
    if (response.ok) {
      const responseData: IResponseRegister = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData);
    }
  }
);

export const fetchAuth = createAsyncThunk('user/fetchAuth', async (info, { rejectWithValue }) => {
  const response = await auth.login(info);
  if (response.ok) {
    const responseData: IResponseRegister = await response.json();
    return responseData;
  } else {
    const responseData: IResponseReject = await response.json();
    return rejectWithValue(responseData.message);
  }
});

export const fetchLogout = createAsyncThunk(
  'user/fetchLogout',
  async (info, { rejectWithValue }) => {
    const response = await auth.logout(info);
    if (response.ok) {
      const responseData: IResponseSuccess = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
  }
);

export const fetchCheckUser = createAsyncThunk(
  'user/fetchCheckUser',
  async (refToken: string | null) => {
    const response = await auth.checkUser();
    if (response.ok) {
      const responseData: IResponseEditUser = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      if (responseData.message === 'jwt expired') {
        const check = await auth.newToken({ token: refToken });
        const checkData: IResponseCheckUser = await check.json();
        setCookie('burgerToken', checkData.accessToken);
        localStorage.setItem('refBurgerToken', checkData.refreshToken);
        if (checkData.success === true) {
          const response = await auth.checkUser();
          const newResponseData: IResponseEditUser = await response.json();
          return newResponseData;
        }
      }
    }
  }
);

export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async (info, { rejectWithValue }) => {
    const response = await auth.editUser(info);
    if (response.ok) {
      const responseData: IResponseEditUser = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  async (info, { rejectWithValue }) => {
    const response = await resetApi.forgotPassword(info);
    if (response.ok) {
      const responseData: IResponseSuccess = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'user/fetchResetPassword',
  async (info, { rejectWithValue }) => {
    const response = await resetApi.resetPassword(info);
    if (response.ok) {
      const responseData: IResponseSuccess = await response.json();
      return responseData;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
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
      .addCase(fetchNewUser.fulfilled, (state, action: PayloadAction<IResponseRegister>) => {
        setCookie('burgerToken', action.payload.accessToken);
        localStorage.setItem('refBurgerToken', action.payload.refreshToken);
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.isLoader = true;
        state.isAuth = action.payload.success;
      })
      .addCase(fetchNewUser.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<IResponseRegister>) => {
        setCookie('burgerToken', action.payload.accessToken);
        localStorage.setItem('refBurgerToken', action.payload.refreshToken);
        state.isLoader = true;
        state.isAuth = action.payload.success;
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        deleteCookie('burgerToken');
        localStorage.removeItem('refBurgerToken');
        state.isLoader = true;
        state.isAuth = false;
        state.userName = '';
        state.userEmail = '';
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchCheckUser.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchCheckUser.fulfilled, (state, action: any) => {
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.isLoader = true;
        state.isAuth = action.payload.success;
      })
      .addCase(fetchCheckUser.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchEditUser.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchEditUser.fulfilled, (state, action: PayloadAction<IResponseEditUser>) => {
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.isLoader = true;
      })
      .addCase(fetchEditUser.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchForgotPassword.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.isLoader = true;
        state.isForgot = true;
      })
      .addCase(fetchForgotPassword.rejected, (state) => {
        state.isLoader = true;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.isLoader = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.isLoader = true;
        state.isReset = true;
        state.isForgot = false;
      })
      .addCase(fetchResetPassword.rejected, (state) => {
        state.isLoader = true;
      });
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
