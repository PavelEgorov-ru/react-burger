import { wsActions } from '../reducers';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '..';
import type { TWsActions } from './type';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: { type: string; payload: string }) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === 'socket/wsInit') {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onerror = () => {
          dispatch(wsActions.onError());
        };

        socket.onmessage = (event) => {
          const data = event.data;
          const parseData = JSON.parse(data);
          dispatch(wsActions.getMessage(parseData));
        };

        socket.onclose = () => {
          dispatch(wsActions.onClose());
        };

        if (type === 'socket/wsClose') {
          socket.close();
        }
      }

      next(action);
    };
  };
};

// стартовый коммит
