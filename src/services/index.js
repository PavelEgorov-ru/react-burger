import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';
import { BASE_WS_URL } from '../utils/constants';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(BASE_WS_URL)),
  devTools: process.env.NODE_ENV !== 'production',
});
