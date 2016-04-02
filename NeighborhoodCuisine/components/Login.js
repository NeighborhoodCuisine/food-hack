import React, { Component, View, Text, NativeModules } from 'react-native'
import FBLogin from 'react-native-facebook-login'

const FBLoginManager = NativeModules.FBLoginManager; // if needed

class Login extends Component {
  render() {
    return (
      <View>
        <FBLogin
            onLogin={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}} />
      </View>
    )
  }
}

module.exports = Login
