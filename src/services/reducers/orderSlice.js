import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from '../../utils/api';

const initialStateOrder = {
  order: {},
  orders: [],
  isOrder: false,
  isLoadingOrder: true,
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

export const fetchOrderInfo = createAsyncThunk(
  'order/fetchOrderInfo',
  async (id, { rejectWithValue }) => {
    const response = await newApi.getOrder(id);
    const responseData = await response.json();
    if (!response.ok) {
      return rejectWithValue(responseData.message);
    }
    return responseData;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = {};
      state.orders = [];
      state.isOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state, action) => {
        state.isOrder = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrder = true;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => state)
      .addCase(fetchOrderInfo.pending, (state, action) => {
        state.isLoadingOrder = false;
      })
      .addCase(fetchOrderInfo.fulfilled, (state, action) => {
        state.isLoadingOrder = true;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrderInfo.rejected, (state, action) => {
        state.isLoadingOrder = true;
      });
  },
});

export const orderReducers = orderSlice.reducer;
export const orderActions = orderSlice.actions;
