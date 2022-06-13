export const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      console.log(type);
      console.log(payload);

      if (type === 'socket/testAstion1') {
        socket = new WebSocket(wsUrl);
        console.log('видит');
      }
      if (socket) {
        socket.onopen = (event) => {
          // dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
          console.log(event);
        };

        // socket.onerror = (event) => {
        //   dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        // };

        socket.onmessage = (event) => {
          const { data } = event;
          console.log(data);
          // dispatch({ type: 'WS_GET_MESSAGE', payload: data });
        };

        // socket.onclose = (event) => {
        //   dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        // };

        // if (type === 'WS_SEND_MESSAGE') {
        //   const message = payload;
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};
