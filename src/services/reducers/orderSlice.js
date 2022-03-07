import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newApi from '../../utils/api';

const initialStateOrder = {
  order: {},
  isOrder: false
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (info) => {
    const response = await newApi.postOrders(info)
    return response.order
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = {}
      state.isOrder = false
    }
  },
  extraReducers: {
    [fetchOrder.pending]: (state, action) => {
      console.log(action)
      state.isOrder = false
    } ,
    [fetchOrder.fulfilled]: (state, action) => {
      state.isOrder = true
      state.order = action.payload

    },
    [fetchOrder.rejected]: state => state 
  }
});

export const orderReducers = orderSlice.reducer;
export const orderActions = orderSlice.actions;
