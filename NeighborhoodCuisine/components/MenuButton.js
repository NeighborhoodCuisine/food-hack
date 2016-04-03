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
      <TouchableHighlight onPress={this.logout.bind(this)} style={{flex: 1}}>
        <Image style={styles.menuButton} source={require('../images/Logoff.png')} />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  menuButton: {
    marginTop: 10,
    marginRight: 16,
    flex: 0,
    height: 24,
    width: 24,
    resizeMode: 'contain',
    alignItems: 'flex-end'
  }
})
