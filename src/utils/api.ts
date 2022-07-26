import React from 'react';
import { BASE_URL } from './constants';
import { getCookie } from './cookie';
import type { TApiConstructor, TPostOrdersInfo } from './type';

class Api extends React.Component {
  baseUrl: string;
  constructor({ baseUrl }: TApiConstructor) {
    super(baseUrl);
    this.baseUrl = baseUrl;
  }

  _request(method: string, endpoint: string, info?: TPostOrdersInfo): Promise<Response> {
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

  getIdegrients() {
    return this._request('GET', 'ingredients');
  }

  postOrders(info: TPostOrdersInfo) {
    return this._request('POST', 'orders', info);
  }

  getOrder(id: number) {
    return this._request('GET', `orders/${id}`);
  }
}

const newApi = new Api({
  baseUrl: BASE_URL,
});

export default newApi;
