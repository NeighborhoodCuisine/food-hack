import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'
import Store from '../lib/Store'
import { ENDPOINT } from '../lib/Endpoint'
import FB from '../lib/FB'

var FBLoginManager = require('NativeModules').FBLoginManager;

export default class Login extends Component {

  componentDidMount() {
    if (FBLoginManager.getCurrentToken) {
      FBLoginManager.getCurrentToken((token) => {
        console.log("token via LoginManager")
        data = {
          credentials: { token }
        }
        this.onLogin(data, this.props.onLoginFound)
      })
    }
  }

  onLogin(data, callback) {
    data = {...data, id: data.id || (data.profile && data.profile.id) || (data.credentials && data.credentials.userId)}
    // if (!data.credentials) {
    //   data.credentials = {
    //     userId: data.id
    //   }
    // }

    console.log('Facebook Data', data)
    Store.store('login', data)

    this.fb = new FB({
      access_token: data.credentials.token,
      fields: ['first_name', 'last_name', 'picture', 'id']
    })
    this.fb.promise.then((data) => {
      const { id } = data
      const loginObj = Store.get('login')

      if (typeof loginObj === 'object') {
        loginObj.id = id
      } else {
        Store.store('login', { id })
      }
    })
    Store.store('fb', this.fb)

    // --- post user data and location to server
    navigator.geolocation.getCurrentPosition(
      (position) => {
        Store.store('position', position)
        this.fb.promise
          .then((userData) => {
            fetch(ENDPOINT + '/user', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: data.credentials.userId,
                fb_token: data.credentials.token,
                fb_link: 'http://facebook.com/' + data.credentials.userId,
                first_name: userData.first_name,
                last_name: userData.last_name,
                image_link: userData.picture.data.url,
                location: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                }
              })
            }).catch(console.error)
          })
          .catch((error) => console.log(error))



      },
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )

    // Login to app before response of backend
    callback()
  }

  render() {
    return (
      <FBLogin
        style={this.props.style}
        onLogin={(data) => this.onLogin(data, this.props.onLogin)}
        onLoginFound={(data) => {console.log("onLoginFound"); return this.onLogin(data, this.props.onLoginFound)}}
        onCancel={function(e){ console.log(e) }}
        onPermissionsMissing={function(e){ console.log(e) }} />
    )
  }
}

Login.defaultProps = {
  onLoginFound: () => {}
}
