type connectionFeedList = 'socket/connectionFeedList';
type connectionOrderList = 'socket/connectionOrderList';
type onOpen = 'socket/onOpen';
type onError = 'socket/onError';
type getMessage = 'socket/getMessage';
type onClose = 'socket/onClose';
type wsClose = 'socket/wsClose';

export type TWsActions =
  | connectionFeedList
  | connectionOrderList
  | onOpen
  | onError
  | getMessage
  | onClose
  | wsClose;
