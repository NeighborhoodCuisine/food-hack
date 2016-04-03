import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'
import Store from '../lib/Store'
import { ENDPOINT } from '../lib/Endpoint'
import FB from '../lib/FB'

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

    this.fb = new FB({
      access_token: data.credentials.token,
      fields: ['first_name', 'last_name', 'picture']
    })
    Store.store('fb', this.fb)

    // Login to app before posting data to backend
    callback()


    // --- post user data and location to server
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
