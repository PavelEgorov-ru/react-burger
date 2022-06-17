import React from 'react';
import { BASE_URL } from './constants';
import { getCookie } from './cookie';

class Api extends React.Component {
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
        Authorization: token ? `Bearer ${token}` : null,
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

  postOrders(info) {
    return this._request('POST', 'orders', info);
  }

  getOrder(id) {
    return this._request('GET', `orders/${id}`);
  }
}

const newApi = new Api({
  baseUrl: BASE_URL,
});

export default newApi;
