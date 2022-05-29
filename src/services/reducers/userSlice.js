import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../utils/auth';
import { setCookie } from '../../utils/cookie';

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
      })
      .addCase(fetchAuth.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })
      .addCase(fetchCheckUser.pending, (state, { payload }) => {
        state.isLoader = false;
      })
      .addCase(fetchCheckUser.fulfilled, (state, { payload }) => {
        state.isLoader = true;
        state.isAuth = payload.success;
      })
      .addCase(fetchCheckUser.rejected, (state, { payload }) => {
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
