import { getCookie } from '../../utils/cookie';
import { wsActions } from '../reducers';

export const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === 'socket/connectionFeedList') {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === 'socket/connectionOrderList') {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('burgerToken')}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsActions.onOpen());
        };

        socket.onerror = (event) => {
          dispatch(wsActions.onError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(wsActions.getMessage(parseData));
        };

        socket.onclose = (event) => {
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
