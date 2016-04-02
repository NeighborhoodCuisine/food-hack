import React, {
  View,
  Component,
  Text,
  TouchableHighlight
} from 'react-native'
import Filter from './Filter'

export default class Main extends Component {
  routeToFilter() {
    this.props.navigator.push({
      name: 'Filter',
      component: Filter,
      title: 'Define your Meal'
    })
  }
  render() {
    return <View>
      <TouchableHighlight onPress={this.routeToFilter.bind(this)}>
        <Text>Filter</Text>
      </TouchableHighlight>
    </View>
  }
}
