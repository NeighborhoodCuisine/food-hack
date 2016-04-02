import React, {
  Navigator,
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight } from 'react-native'
import Main from './main'


export default class Navigation extends Component {
  renderScene(route, navigator) {
    if (!route.component) {
      throw new Error('Provide a component propery on routing!')
    }

    let RouteComponent = route.component
    return <ScrollView style={styles.scene}>
      <RouteComponent navigator={navigator} {...route.passProps} />
    </ScrollView>
  }

  render() {
    return <Navigator
        navigationBar={<Navigator.NavigationBar style={styles.navBar} routeMapper={routeMapper} />}
        style={styles.navigator}
        initialRoute={{ name: 'Main', component: Main }}
        renderScene={ this.renderScene } />
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
  },
  navBar: {
    marginVertical: 10
  },
  navigator: {
    flexWrap: 'wrap',
    flexDirection: 'column'
    // top: 20
    // flex: 1,
    // top: 0,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // backgroundColor: '#9ECE9A'
  },
  scene: {
    flex: 1,
    paddingTop: 70,
    // top: 30
  }
})

const routeMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index == 0) {
      return null
    }

    const backButtonText = route.backButtonText || "< Back"

    return <TouchableHighlight
      underlayColor="transparent"
      onPress={() => { if (index > 0) { navigator.pop() }}}>
      <Text>{backButtonText}</Text>
    </TouchableHighlight>
  },
  RightButton() { return null },
  Title() { return <Text style={{ marginVertical: 10 }}>My Title</Text> }
}
