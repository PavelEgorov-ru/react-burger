import React from 'react';
const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

class Api extends React.Component {
  constructor({baseUrl}) {
    super(baseUrl)
    this.baseUrl = baseUrl;
  }

  _request(method) {
    const pattern = {
      method: method,
      headers: {
       'Content-Type': 'application/json',
      }
     }

     return fetch(this.baseUrl, pattern)
     .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        Promise.reject(`ошибка: ${res.status}`)
      }
     })

  }

  getIdegrients() {
    return this._request('GET')
  }
}

const newApi = new Api ({
  baseUrl: baseUrl,
})

export default newApi