const _  = require('lodash')

const contentEndpoint = 'https://api.imagga.com/v1/content'
// const contentEndpoint = 'http://c1c480d2.ngrok.io'
const taggingEndpoint = 'https://api.imagga.com/v1/tagging'
const todeskey = 'YWNjXzAwODE4MDQwMzViYjQyNDpmZjVhOWI2YTMxOWUxMGNiYmEzYWM3MTVjNzJjZTFkNQ=='

const blacklist = ['food', 'vegetable', 'laptop', 'computer', 'pencil']

export default class ImageTagger {
  uploadImage(filename) {
    return new Promise(function(resolve, reject) {
      const splitted = filename.split('/')
      const file = splitted[splitted.length - 1]
      const image = {
        uri: filename,
        type: 'image/jpeg',
        name: file,
      };

      const data = new FormData()
      data.append('image', image)
      const request = new XMLHttpRequest()

      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          resolve(JSON.parse(request.responseText))
        } else {
          console.error('error', request);
          reject(JSON.parse(request.responseText))
        }
      };

      request.open('POST', contentEndpoint)
      request.setRequestHeader('Authorization', 'Basic ' + todeskey)
      request.setRequestHeader('Content-Type', 'multipart/form-data')
      request.send(data)
    });
  }

  getTags(contentId) {
    return fetch(taggingEndpoint + `?content=${contentId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + todeskey
      }
    }).then(response => response.json())
  }

  isNotInBlacklist(tag) {
    return !blacklist.includes(tag)
  }

  getBestTag(tags) {
    const withTag = _.filter(tags, obj => 'tag' in obj)
    const filtered = _.filter(withTag, obj => this.isNotInBlacklist(obj.tag))
    return _.maxBy(filtered, 'confidence')
  }

  tagImageFromFile(filename) {
    return this.uploadImage(filename)
      .then(json => this.getTags(json.uploaded[0].id))
      .then(json => this.getBestTag(json.results[0].tags))
  }
}
