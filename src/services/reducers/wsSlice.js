import { createSlice } from '@reduxjs/toolkit';

const initialStateSocket = {
  test1: {},
};

const wsSlice = createSlice({
  name: 'socket',
  initialState: initialStateSocket,
  reducers: {
    testAstion1(state, action) {
      state.state1 = action.payload;
    },
    testAction2(state, action) {
      state.state1 = action.payload;
    },
  },
});

export const wsReducers = wsSlice.reducer;
export const wsActions = wsSlice.actions;
