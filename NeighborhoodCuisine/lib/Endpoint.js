import Store from './Store'

export const ENDPOINT = 'http://87.106.89.243:8080'

export function nearby() {
  return fetch(ENDPOINT + '/nearby', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Store.get('login').credentials.userId
    })
  })
}
