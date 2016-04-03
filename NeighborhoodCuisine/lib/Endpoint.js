import Store from './Store'

export const ENDPOINT = 'http://87.106.89.243:8080'

function getWithId(route) {
  return fetch(ENDPOINT + '/' + route, {
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

export function nearby() {
  return getWithId('nearby')
}

export function getMatch() {
  return getWithId('match')
}
