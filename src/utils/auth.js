import React from 'react';
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
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`ошибка: ${res.status}`);
      }
    });
  }

  registration(info) {
    return this._request('POST', 'register', info);
  }

  authorization(info) {
    return this._request('POST', 'login', info);
  }

  logOut(info) {
    return this._request('POST', 'logout', info);
  }

  newToken(info) {
    return this._request('POST', 'token', info);
  }
}

const auth = new Auth({
  baseUrl: BASE_URL,
});

export default auth;
