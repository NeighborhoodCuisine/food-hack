import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'

const loginEndpoint = "http://example.com"

export default class Login extends Component {
  onLogin(data) {
    console.log('Facebook Data', data)

    fetch(loginEndpoint, {
      method: 'POST',
      data: data
    }).then(() => this.props.onLogin())
  }

  render() {
    return (
      <FBLogin
        style={this.props.style}
        onLogin={this.onLogin.bind(this)}
        onLoginFound={this.props.onLoginFound.bind(this)}
        onCancel={function(e){ console.log(e) }}
        onPermissionsMissing={function(e){ console.log(e) }} />
    )
  }
}

Login.defaultProps = {
  onLoginFound: () => {}
}
