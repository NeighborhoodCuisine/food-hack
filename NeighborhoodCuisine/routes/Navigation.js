import React, {
  Navigator,
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
  BackAndroid } from 'react-native'
import Welcome from './Welcome'
import Main from './Main'
import MenuButton from '../components/MenuButton'
import CommonStyles from '../components/Styles'

export default class Navigation extends Component {

  componentDidMount() {
    const _this = this
    BackAndroid.addEventListener('hardwareBackPress', function() {
         if (!_this.onMainScreen()) {
           _this.goBack()
           return true
         }
         return true
    })
  }

  goBack() {
    this.refs.navigator.pop()
  }

  onMainScreen() {
    const routes = this.refs.navigator.getCurrentRoutes()
    if (routes.length == 1) return true
    const currentRoute = routes[routes.length - 1]
    return (currentRoute.name === 'Main') || (currentRoute.name === 'Welcome')
  }

  renderScene(route, navigator) {
    if (!route.component) {
      throw new Error('Provide a component propery on routing!')
    }

    let RouteComponent = route.component
    let backgroundImage = route.backgroundImage || require('../images/Background-Main.jpg')

    return <View>
      <Image style={styles.overlay} source={backgroundImage} />
      <Image style={styles.overlay} source={require('../images/Overlay.png')} />
      <View style={styles.scene}>
        <RouteComponent navigator={navigator} {...route.passProps} />
      </View>
    </View>
  }

  render() {
    return <Navigator ref="navigator"
        navigationBar={<Navigator.NavigationBar style={styles.navBar} routeMapper={routeMapper} />}
        style={styles.navigator}
        initialRoute={{ name: 'Welcome', component: Welcome, hide: true }}
        renderScene={ this.renderScene } />
  }
}

import RecipeOverview from '../components/RecipeOverview'
import PeopleOverview from '../components/PeopleOverview'

class Test2 extends Component {
  render() {
    return <View>
      <PeopleOverview count={5} users={[{name: 'Sven', 'image': 'http://stockfresh.com/files/i/icefront/m/41/351572_stock-photo-party-food.jpg', fb_link: 'https://www.facebook.com/'}]}
    />
    <RecipeOverview
      image={'http://stockfresh.com/files/i/icefront/m/41/351572_stock-photo-party-food.jpg'}
      title={"ChickenCurry"}
      cuisine={"Indian"}
      recipeUrl={"http://google.com"}
    />
    </View>
  }
}


class Test extends Component {
  render() {
    return
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
    // flexWrap: 'wrap',
    // flexDirection: 'column'
  },
  scene: {
    paddingTop: 70
  },
  title: {
    marginVertical: 10
  },
  backButton: {
    left: 10,
    color: '#fff',
    width: 60
  }
});

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
      <Text style={styles.backButton}>{backButtonText}</Text>
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
    return null
    if (route.hide || route.hideTitle) {
      return null
    }
    const title = route.title || 'Neighborhood Cuisine'
    return <Text style={[CommonStyles.text, styles.title]}>{title}</Text>
  }
};
