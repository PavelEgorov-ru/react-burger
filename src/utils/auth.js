import React from 'react';
import { getCookie } from './cookie';
export const BASE_URL = 'https://norma.nomoreparties.space/api/auth';

class Auth extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info) {
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('burgerToken'),
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    );
  }

  login(info) {
    return this._request('POST', 'login', info);
  }

  register(info) {
    return this._request('POST', 'register', info);
  }

  logout() {
    return this._request('POST', 'logout');
  }

  token() {
    return this._request('POST', 'token');
  }

  checkUser() {
    return this._request('GET', 'user');
  }
}

const auth = new Auth({
  baseUrl: BASE_URL,
});

export default auth;
