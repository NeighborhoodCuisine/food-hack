import React, { Component,
                View,
                Text,
                StyleSheet,
                Image,
                TouchableHighlight,
                NativeModules } from 'react-native'
import Main from './Main'
import CommonStyles from '../components/Styles'
import Login from '../components/Login'

export default class Welcome extends Component {
  routeToMain() {
    this.props.navigator.push({
      name: 'Main',
      component: Main,
      hideLeft: true,
      hideTitle: true,
      backgroundImage: require('../images/Background-Hungry.png')
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <Image style={styles.logo} source={require('../images/Logo.png')} />
        <Text style={[CommonStyles.text, CommonStyles.heading, CommonStyles.textPadding, styles.welcome]}>Welcome to</Text>
        <Text style={[CommonStyles.text, CommonStyles.heading, CommonStyles.textPadding]}>Neighborhood Cuisine</Text>

        <Login
          style={styles.login}
          onLogin={this.routeToMain.bind(this)}
          onLoginFound={this.routeToMain.bind(this)} />
        <Text style={[CommonStyles.text, CommonStyles.textPadding, CommonStyles.subheading, styles.spacing]}>Get ready to dine.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center'
  },
  welcome: {
    marginTop: 64
  },
  button: {},
  logo: {
    marginTop: 32
  },
  login: {
    marginTop: 32
  },
  spacing: {
    paddingTop: 8
  }
})
