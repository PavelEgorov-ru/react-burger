import { getCookie } from '../../utils/cookie';
import { wsActions } from '../reducers';

export const socketMiddleware = (wsUrl: any) => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
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

        socket.onmessage = (event: any) => {
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
