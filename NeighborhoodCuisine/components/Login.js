import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'
import Store from '../lib/Store'
import { ENDPOINT } from '../lib/Endpoint'

export default class Login extends Component {
  onLogin(data, callback) {
    data = {...data, id: data.id || (data.profile && data.profile.id) || (data.credentials && data.credentials.userId)}
    if (!data.credentials) {
      data.credentials = {
        userId: data.id
      }
    }

    console.log('Facebook Data', data)
    Store.store('login', data)

    // Login to app before posting data to backend
    callback()

    // --- post user data and location to server
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let payload = {
          id: data.credentials.userId,
          fb_token: data.credentials.token,
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        }

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
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          })
        }).catch(console.error)
      },
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <FBLogin
        style={this.props.style}
        onLogin={(data) => this.onLogin(data, this.props.onLogin)}
        onLoginFound={(data) => this.onLogin(data, this.props.onLoginFound)}
        onCancel={function(e){ console.log(e) }}
        onPermissionsMissing={function(e){ console.log(e) }} />
    )
  }
}

Login.defaultProps = {
  onLoginFound: () => {}
}
