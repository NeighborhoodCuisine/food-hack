const FB_API = 'https://graph.facebook.com/v2.5/me?'

export default class FB {
  constructor(config) {
    const params = Object.keys(config).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(config[k])
    }).join('&')

    this.promise = fetch(FB_API + params, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(console.error)
  }

  getPicture() {
    this.promise.then((data) => data.picture)
  }

  getName() {
    this.promise.then((data) => data.first_name)
  }
}
