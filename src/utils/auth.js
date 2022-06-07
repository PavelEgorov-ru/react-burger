import React from 'react';
import { getCookie } from './cookie';
import { BASE_URL } from './constants';
export const BASE_URL_AUTH = `${BASE_URL}/auth`;

class Auth extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info) {
    const token = getCookie('burgerToken');
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: faceToken,
        Authorization: token ? token : null,
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

  logout(info) {
    return this._request('POST', 'logout', info);
  }

  newToken(info) {
    return this._request('POST', 'token', info);
  }

  checkUser(info) {
    return this._request('GET', 'user', info);
  }

  editUser(info) {
    return this._request('PATCH', 'user', info);
  }
}

const auth = new Auth({
  baseUrl: BASE_URL_AUTH,
});

export default auth;
