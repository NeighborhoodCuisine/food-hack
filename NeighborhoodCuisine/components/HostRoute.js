import React, { View,
                Component,
                Image,
                StyleSheet,
                TouchableHighlight,
                LinkingIOS,
                Text } from 'react-native'
import Store from '../lib/Store.js'

export default class HostRoute extends Component {

  route() {
    const myPos = Store.get('position')
    const hostPos = this.props.position

    var url = `http://maps.apple.com/?saddr=${myPos.lat},`
      + `${myPos.long}&daddr=${hostPos.lat},${hostPos.lon}`
    LinkingIOS.openURL(url)
  }

  render() {
    return (
      <View>
        <View style={{
                flexDirection: 'row',
                left: 20
              }}>
        </View>
        <View style={styles.cardActionStyle}>
          <View style={styles.cardStyle}>
            <TouchableHighlight
               style={s.touch}
               onPress={this.route.bind(this)}
               underlayColor='white'>
              <Text style={s.text}>Directions to host</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

import { CardStyles } from './Styles'
const styles = CardStyles
const backgroundHungry = {
  width: 24,
  resizeMode: 'contain'
}
const recipeText = {
  marginTop: 12,
  marginLeft: 8
}
const s = {
  ingredientText: {
    padding: 8,
    paddingLeft: 20
  },
  missing: {
    color: '#E53935'
  },
  present: {
    color: 'green'
  },
  touch: {
    height: 60,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18
  }
}
