import React from 'react';
const BASE_URL = 'https://norma.nomoreparties.space/api';

class Api extends React.Component {
  constructor({baseUrl}) {
    super(baseUrl)
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint, info) {
    const pattern = {
      method: method,
      headers: {
       'Content-Type': 'application/json',
      }
     }

     return fetch(`${this.baseUrl}/${endpoint}`,
     info ? {...pattern, body: JSON.stringify(info)} : pattern)
     .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        Promise.reject(`ошибка: ${res.status}`)
      }
     })

  }

  getIdegrients() {
    return this._request('GET', 'ingredients')
  }

  postOrders(info) {
    return this._request('POST', 'orders', info)
  }
}

const newApi = new Api ({
  baseUrl: BASE_URL,
})

export default newApi