import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import newApi from '../../utils/api';

const initialStateOrder = {
  order: {},
  isOrder: false,
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (info, { rejectWithValue }) => {
    const response = await newApi.postOrders(info);
    const responseData = await response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = {};
      state.isOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        console.log(action);
        state.isOrder = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrder = true;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => state);
  },
});

export const orderReducers = orderSlice.reducer;
export const orderActions = orderSlice.actions;
