import React from 'react';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

class ResetApi extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info) {
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

  forgotPassword(info) {
    return this._request('POST', 'password-reset', info);
  }

  resetPassword(info) {
    return this._request('POST', 'password-reset/reset', info);
  }
}

const resetApi = new ResetApi({
  baseUrl: BASE_URL,
});

export default resetApi;
