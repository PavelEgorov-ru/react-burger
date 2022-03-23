import React from 'react';
export const BASE_URL = 'https://norma.nomoreparties.space/api/auth';

class Auth extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info, token) {
    console.log(token);
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    );
  }

  registration(info) {
    return this._request('POST', 'register', info);
  }

  authorization(info, token) {
    console.log(token);
    return this._request('POST', 'login', info, token);
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
