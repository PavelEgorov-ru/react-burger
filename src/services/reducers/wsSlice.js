import { createSlice } from '@reduxjs/toolkit';

const initialStateSocket = {};

const wsSlice = createSlice({
  name: 'socket',
  initialState: initialStateSocket,
  reducers: {},
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
