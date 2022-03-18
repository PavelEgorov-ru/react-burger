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
  error: '',
};
//
export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async (info, { rejectWithValue }) => {
    try {
      const response = await auth.registration(info);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

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
        console.log(payload);
      })
      .addCase(fetchNewUser.rejected, (state, action) => {
        console.log(222);
        if (action) {
          console.log(111);
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(fetchAuth.pending, (state) => state)
      .addCase(fetchAuth.fulfilled, ({ payload }) => console.log(payload))
      .addCase(fetchAuth.rejected, ({ payload }) => console.log(payload));
  },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
