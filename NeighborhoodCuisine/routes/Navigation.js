import React, {
  Navigator,
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight } from 'react-native'
import Welcome from './Welcome'
import MenuButton from '../components/MenuButton'
import CommonStyles from '../components/Styles'

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
      <View style={styles.scene}>
        <RouteComponent navigator={navigator} {...route.passProps} />
      </View>
    </View>
  }

  render() {
    return <Navigator
        navigationBar={<Navigator.NavigationBar style={styles.navBar} routeMapper={routeMapper} />}
        style={styles.navigator}
        initialRoute={{ name: 'Welcome', component: Welcome, hide: true }}
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
  },
  title: {
    marginVertical: 10
  }
})

const routeMapper = {
  LeftButton(route, navigator, index, navState) {
    if (route.hide || route.hideLeft) {
      return null
    }

    if (index <= 1) {
      return null
    }

    const backButtonText = route.backButtonText || "< Back"

    return <TouchableHighlight
      underlayColor="transparent"
      onPress={() => { if (index > 0) { navigator.pop() }}}>
      <Text>{backButtonText}</Text>
    </TouchableHighlight>
  },
  RightButton(route, navigator) {
    if (route.hide || route.hideRight) {
      return null
    }

    if (route.name !== 'Main') {
      return null
    }

    return <MenuButton navigator={navigator}/>
  },
  Title(route) {
    if (route.hide || route.hideTitle) {
      return null
    }
    const title = route.title || 'Neighborhood Cuisine'
    return <Text style={[CommonStyles.text, styles.title]}>{title}</Text>
  }
}
