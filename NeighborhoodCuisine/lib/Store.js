export class Store {
  constructor() {
    this.storage = {}
  }

  store(key, data) {
    this.storage[key] = data
  }

  get(key) {
    return this.storage[key]
  }
}

export default new Store()
