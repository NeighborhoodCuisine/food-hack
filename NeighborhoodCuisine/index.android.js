/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

import Login from './components/Login'
import Navigation from './routes/navigation'

const FBLoginManager = NativeModules.FBLoginManager; // if needed

class NeighborhoodCuisine extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }
  }

  componentWillMount() {
    // FBLoginManager.getCurrentToken((token) => {
    //   if (token !== '') {
    //     this.handleLogin()
    //   }
    // })
    FBLoginManager.logout((msg) => {
      console.log(msg)
    })
  }

  componentWillUnmount() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NeighborhoodCuisine', () => NeighborhoodCuisine);
