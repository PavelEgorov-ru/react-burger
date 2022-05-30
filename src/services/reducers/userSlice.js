import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import { setCookie, deleteCookie } from '../../utils/cookie';

const initialState = {
  isAuth: false,
  isLoader: false,
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
      return rejectWithValue(responseData.message);
    }
    return responseData;
  } catch (res) {
    console.log({ res });
  }
});

export const fetchLogout = createAsyncThunk(
  'user/fetchLogout',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.logout(info);
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

export const fetchCheckUser = createAsyncThunk('user/fetchCheckUser', async () => {
  try {
    const response = await auth.checkUser();
    if (response.status === 403) {
      const response = await auth.newToken({ token: localStorage.getItem('refBurgerToken') });
      const responseData = response.json();
      return responseData;
    } else {
      const responseData = response.json();
      return responseData;
    }
  } catch (res) {
    console.log({ res });
  }
});

export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.editUser(info);
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

export const fetchNewToken = createAsyncThunk(
  'user/fetchNewToken',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.newToken(info);
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

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    endLoader(state) {
      state.isLoader = true;
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
        state.errorMessage = payload;
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
        state.errorMessage = payload;
      })
      .addCase(fetchCheckUser.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchCheckUser.fulfilled, (state, { payload }) => {
        payload.accessToken && setCookie('burgerToken', payload.accessToken);
        payload.refreshToken && localStorage.setItem('refBurgerToken', payload.refreshToken);
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
      .addCase(fetchNewToken.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchNewToken.fulfilled, (state, { payload }) => {
        setCookie('burgerToken', payload.accessToken);
        localStorage.setItem('refBurgerToken', payload.refreshToken);
        state.isLoader = true;
        state.isAuth = true;
      })
      .addCase(fetchNewToken.rejected, (state, { payload }) => {});
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
