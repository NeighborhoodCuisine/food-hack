import React, {
  Navigator,
  Component,
  StyleSheet } from 'react-native'
import Main from './main'
import Layout from '../components/Layout'

export default class Navigation extends Component {
  renderScene(route, navigator) {
    if (!route.component) {
      throw new Error('Provide a component propery on routing!')
    }

    let RouteComponent = route.component
    return <RouteComponent navigator={navigator} {...route.passProps} />
  }

  render() {
    return <Navigator
        style={styles.navigator}
        initialRoute={{ name: 'Main', component: Main }}
        renderScene={ this.renderScene } />
  }
}

const styles = StyleSheet.create({
  navigator: {
    justifyContent: 'center',
    backgroundColor: '#9ECE9A'
  }
})
