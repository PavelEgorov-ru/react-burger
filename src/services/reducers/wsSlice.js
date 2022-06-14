import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialStateSocket = {
  isConect: false,
  isLoadingWs: true,
  success: false,
  orders: [],
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
    },
    onError(state) {
      state.isConect = false;
      state.isLoadingWs = true;
    },
    onClose(state) {
      state.isConect = false;
      state.success = false;
      state.orders = [];
    },
    wsClose(state, actin) {},
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
