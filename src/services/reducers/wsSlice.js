import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialStateSocket = {
  isConect: false,
  isLoadingWs: true,
  message: {},
  error: '',
};

const wsSlice = createSlice({
  name: 'socket',
  initialState: initialStateSocket,
  reducers: {
    connectionFeedList(state, action) {
      state.isLoadingWs = false;
    },
    connectionOrderList(state, action) {
      state.isLoadingWs = false;
    },
    onOpen(state, action) {
      state.isConect = true;
    },
    getMessage(state, action) {
      state.isLoadingWs = true;
      state.message = action.payload;
    },
    onError(state, action) {
      state.isConect = false;
      state.isLoadingWs = true;
    },
    onClose(state, action) {
      state.isConect = false;
    },
    wsClose(state, actin) {},
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
