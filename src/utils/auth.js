import React from 'react';
import { getCookie } from '../../utils/cookie';
export const BASE_URL = 'https://norma.nomoreparties.space/api/auth';

class Auth extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info) {
    console.log(token);
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + getCookie('burgerToken'),
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    );
  }

  login() {
    return this._request('POST', 'login');
  }

  register() {
    return this._request('POST', 'register');
  }

  logout() {
    return this._request('POST', 'logout');
  }

  token() {
    return this._request('POST', 'token');
  }
}

const auth = new Auth({
  baseUrl: BASE_URL,
});

export default auth;
