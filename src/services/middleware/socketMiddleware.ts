import { getCookie } from '../../utils/cookie';
import { wsActions } from '../reducers';
import { MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: { type: string; payload: string }) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === 'socket/connectionFeedList') {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === 'socket/connectionOrderList') {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('burgerToken')}`);
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
