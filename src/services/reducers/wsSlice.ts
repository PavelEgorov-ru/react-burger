import { createSlice } from '@reduxjs/toolkit';
import type { IStateWs, IResponsDataWs } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialStateSocket: IStateWs = {
  isConect: false,
  isLoadingWs: true,
  success: false,
  orders: [],
  total: null,
  totalToday: null,
  error: '',
};

const wsSlice = createSlice({
  name: 'socket',
  initialState: initialStateSocket,
  reducers: {
    connectionFeedList(state, payload) {
      state.isLoadingWs = false;
    },
    connectionOrderList(state, payload) {
      state.isLoadingWs = false;
    },
    onOpen(state) {
      state.isConect = true;
    },
    getMessage(state, action: PayloadAction<IResponsDataWs>) {
      state.isLoadingWs = true;
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onError(state) {
      state.isConect = false;
      state.isLoadingWs = true;
    },
    onClose(state) {
      state.isConect = false;
      state.success = false;
      state.orders = [];
      state.total = null;
      state.totalToday = null;
    },
    wsClose() {},
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
