import React, {
  Navigator,
  Component,
  StyleSheet,
  Text,
  Image,
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
    let backgroundImage = route.backgroundImage || require('../images/Background-Main.png')
    return <View>
      <Image style={styles.overlay} source={backgroundImage} />
      <Image style={styles.overlay} source={require('../images/Overlay.png')} />
      <ScrollView style={styles.scene}>
        <RouteComponent navigator={navigator} {...route.passProps} />
        </ScrollView>
    </View>
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
  overlay: {
    flex: 1,
    resizeMode: 'cover',
    top: 0,
    position: 'absolute'
  },
  navBar: {
    marginVertical: 10
  },
  navigator: {
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  scene: {
    flex: 1,
    paddingTop: 70
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
