import { getCookie } from '../../utils/cookie';
import { wsActions } from '../reducers';

export const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      console.log(type);
      console.log(payload);

      if (type === 'socket/connectionFeedList') {
        socket = new WebSocket(`${wsUrl}/all`);
        console.log('общее соединение');
      }
      if (type === 'socket/connectionOrderList') {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('burgerToken')}`);
        console.log('соединение для данных профиля');
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsActions.onOpen());
          console.log(event);
        };

        socket.onerror = (event) => {
          dispatch(wsActions.onError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          console.log(parseData);
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
