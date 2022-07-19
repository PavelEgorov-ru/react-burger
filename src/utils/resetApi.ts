import React from 'react';
import { BASE_URL } from './constants';
import { TApiConstructor, TForgotPasswordInfo, TResetPasswordInfo } from './type';

class ResetApi extends React.Component {
  baseUrl: string;
  constructor({ baseUrl }: TApiConstructor) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method: string, endpoint: string, info: any) {
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    );
  }

  forgotPassword(info: TForgotPasswordInfo) {
    return this._request('POST', 'password-reset', info);
  }

  resetPassword(info: TResetPasswordInfo) {
    return this._request('POST', 'password-reset/reset', info);
  }
}

const resetApi = new ResetApi({
  baseUrl: BASE_URL,
});

export default resetApi;
