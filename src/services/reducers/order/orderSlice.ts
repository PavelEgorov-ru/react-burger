import newApi from "../../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IIngredientsId, IResponseOrder, IStateOrder } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { AppDispatch } from '../../store';
// import type { AppDispatch} from '../../store';

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (ingredientsId: IIngredientsId) => {
    const response = await newApi.postOrders(ingredientsId);
    const order: IResponseOrder = await response.order;
    return order;
  }
);

const initialStateOrder: IStateOrder = {
  order: {},
  isOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialStateOrder,
  reducers: {
    closeModal(state) {
      state.order = {};
      state.isOrder = false;
    },
  },
  extraReducers: {
    "order/fetchOrder/pending": (state) => {
      state.isOrder = false;
    },
    "order/fetchOrder/fulfilled": (
      state,
      { payload }: PayloadAction<IResponseOrder>
    ) => {
      state.isOrder = true;
      state.order = payload;
    },
    "order/fetchOrder/rejected": (state) => state,
  },
});

export const orderReducers = orderSlice.reducer;
export const orderActions = orderSlice.actions;
