/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

import Login from './components/Login'
import Navigation from './routes/navigation'

const FBLoginManager = NativeModules.FBLoginManager

export default class NeighborhoodCuisine extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }
  }

  componentWillMount() {
    FBLoginManager.logout((msg) => {
      console.log(msg)
    })
  }

  handleLogin() {
    this.setState({ isLoggedIn: true })
  }

  handleLogout() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    return this.state.isLoggedIn ?
      <Navigation /> :
      <Login
        onLogin={this.handleLogin.bind(this)}
        onLogout={this.handleLogout.bind(this)} />
  }
}
