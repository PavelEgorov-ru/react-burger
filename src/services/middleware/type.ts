import { CaseReducer, CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';

export type TWsActions = CaseReducerActions<{
  wsInit: CaseReducer<any, PayloadAction<any>>;
  wsSendMessage: CaseReducer;
  wsClose: CaseReducer;
  onOpen: CaseReducer;
  onClose: CaseReducer;
  onError: CaseReducer;
  getMessage: CaseReducer<any, PayloadAction<any>>;
}>;
