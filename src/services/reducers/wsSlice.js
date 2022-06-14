import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialStateSocket = {
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
    connectionFeedList(state) {
      state.isLoadingWs = false;
    },
    connectionOrderList(state) {
      state.isLoadingWs = false;
    },
    onOpen(state) {
      state.isConect = true;
    },
    getMessage(state, { payload }) {
      state.isLoadingWs = true;
      state.success = payload.success;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
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
    wsClose(state, actin) {},
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
