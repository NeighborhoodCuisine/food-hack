import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'
import Store from '../lib/Store'

const loginEndpoint = "http://example.com"

export default class Login extends Component {
  onLogin(data, callback) {
    console.log('Facebook Data', data)
    Store.store('login', data)

    fetch(loginEndpoint, {
      method: 'POST',
      data: data
    }).then(callback)
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
