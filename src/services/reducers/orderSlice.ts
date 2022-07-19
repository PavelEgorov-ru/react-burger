import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  IResponseOrderSlise,
  IResponseReject,
  IResponseOrderInfoSlice,
  IStateOrder,
  IOrderObj,
  IIngredient,
  IOrderInfo,
} from './types';
import type { PayloadAction } from '@reduxjs/toolkit';
import newApi from '../../utils/api';

const initialStateOrder: IStateOrder = {
  order: [],
  orderInfo: {
    ingredients: [],
    _id: '',
    owner: {
      createdAt: '',
      email: '',
      name: '',
      updatedAt: '',
    },
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    price: 0,
  },
  isOrder: false,
  isLoadingOrder: true,
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (info: any, { rejectWithValue }) => {
    const response = await newApi.postOrders(info);
    if (response.ok) {
      const responseData: IResponseOrderSlise = await response.json();
      return responseData.order;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
  }
);

export const fetchOrderInfo = createAsyncThunk(
  'order/fetchOrderInfo',
  async (id: number, { rejectWithValue }) => {
    const response = await newApi.getOrder(id);
    if (response.ok) {
      const responseData: IResponseOrderInfoSlice = await response.json();
      return responseData.orders;
    } else {
      const responseData: IResponseReject = await response.json();
      return rejectWithValue(responseData.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = [];
      state.orderInfo = {
        ingredients: [],
        _id: '',
        owner: {
          createdAt: '',
          email: '',
          name: '',
          updatedAt: '',
        },
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 0,
        price: 0,
      };
      state.isOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrder = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<IOrderInfo>) => {
        state.isOrder = true;
        state.orderInfo = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => state)
      .addCase(fetchOrderInfo.pending, (state) => {
        state.isLoadingOrder = false;
      })
      .addCase(fetchOrderInfo.fulfilled, (state, action: PayloadAction<IOrderObj[]>) => {
        state.isLoadingOrder = true;
        state.order = action.payload;
      })
      .addCase(fetchOrderInfo.rejected, (state) => {
        state.isLoadingOrder = true;
      });
  },
});

export const orderReducers = orderSlice.reducer;
export const orderActions = orderSlice.actions;
