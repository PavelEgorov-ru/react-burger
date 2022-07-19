import React from 'react';
import type {
  TApiConstructor,
  TLoginInfo,
  TRegisterInfo,
  TLogoutInfo,
  TNewTokenInfo,
  TEditUserInfo,
} from './type';
import { getCookie } from './cookie';
import { BASE_URL } from './constants';
export const BASE_URL_AUTH = `${BASE_URL}/auth`;

type TInfo =
  | TApiConstructor
  | TLoginInfo
  | TRegisterInfo
  | TLogoutInfo
  | TNewTokenInfo
  | TEditUserInfo;

class Auth extends React.Component {
  baseUrl: string;
  constructor({ baseUrl }: TApiConstructor) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method: string, endpoint: string, info?: TInfo) {
    const token = getCookie('burgerToken');
    const pattern = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    return fetch(
      `${this.baseUrl}/${endpoint}`,
      info ? { ...pattern, body: JSON.stringify(info) } : pattern
    );
  }

  login(info: TLoginInfo) {
    return this._request('POST', 'login', info);
  }

  register(info: TRegisterInfo) {
    return this._request('POST', 'register', info);
  }

  logout(info: TLogoutInfo) {
    return this._request('POST', 'logout', info);
  }

  newToken(info: TNewTokenInfo) {
    return this._request('POST', 'token', info);
  }

  checkUser() {
    return this._request('GET', 'user');
  }

  editUser(info: TEditUserInfo) {
    return this._request('PATCH', 'user', info);
  }
}

const auth = new Auth({
  baseUrl: BASE_URL_AUTH,
});

export default auth;
