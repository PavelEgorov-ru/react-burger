import React from 'react';
export const BASE_URL = 'https://norma.nomoreparties.space/api/auth';

class Auth extends React.Component {
  constructor({ baseUrl }) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info, token) {
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    ).then((res) => {
      if (res.ok) {
        console.log(res.json());
        return res.json();
      } else {
        //
        Promise.reject(res);
      }
    });
  }

  registration(info) {
    return this._request('POST', 'register', info);
  }

  authorization(info, token) {
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
