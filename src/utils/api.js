import React from 'react';
const BASE_URL = 'https://norma.nomoreparties.space/api';

class Api extends React.Component {
  constructor({baseUrl}) {
    super(baseUrl)
    this.baseUrl = baseUrl;
  }

  _request(method, endpoint) {
    const pattern = {
      method: method,
      headers: {
       'Content-Type': 'application/json',
      }
     }

     return fetch(`${this.baseUrl}/${endpoint}`, pattern)
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
}

const newApi = new Api ({
  baseUrl: BASE_URL,
})

export default newApi