import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, wsActions } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';
import { BASE_WS_URL } from '../utils/constants';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(BASE_WS_URL, wsActions)),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
