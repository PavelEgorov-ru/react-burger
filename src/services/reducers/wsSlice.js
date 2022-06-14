import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialStateSocket = {
  isConect: false,
  isLoadingWs: true,
  message: [],
  error: '',
};

const wsSlice = createSlice({
  name: 'socket',
  initialState: initialStateSocket,
  reducers: {
    connectionFeedList(state, action) {
      state.isConect = true;
      state.isLoadingWs = false;
    },
    connectionOrderList(state, action) {
      state.isConect = true;
      state.isLoadingWs = false;
    },
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
