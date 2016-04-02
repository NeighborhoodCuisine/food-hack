import React, { Component, View, Text, NativeModules, StyleSheet } from 'react-native'
import FBLogin from 'react-native-facebook-login'

const FBLoginManager = NativeModules.FBLoginManager; // if needed

const loginEndpoint = "http://example.com"

class Login extends Component {

  onLogin(data) {
    console.log(data)
    fetch(loginEndpoint, {
      method: 'POST',
      data: data
    }).then(() => this.props.onLogin())
  }

  render() {
    return (
      <View style={styles.container}>
        <FBLogin
            onLogin={this.onLogin.bind(this)}
            onLogout={this.props.onLogout}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Login
