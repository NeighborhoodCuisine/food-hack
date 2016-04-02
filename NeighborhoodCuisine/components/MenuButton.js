import React, {
  View,
  Component,
  StyleSheet,
  NativeModules,
  TouchableHighlight,
  Image } from 'react-native'
const { FBLoginManager } = NativeModules

export default class MenuButton extends Component {
  routeToWelcome() {
    this.props.navigator.popToTop()
  }

  logout() {
    FBLoginManager.logout(() => { this.routeToWelcome() })
  }

  render() {
    return (
      <TouchableHighlight onPress={this.logout.bind(this)}>
        <Image style={styles.menuButton} source={require('../images/Logoff.png')} />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  menuButton: {

  }
})
