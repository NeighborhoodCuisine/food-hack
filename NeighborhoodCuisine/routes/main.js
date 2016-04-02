import React, { Component,
                View,
                Text,
                StyleSheet } from 'react-native'
import Filter from './Filter'


export default class Main extends Component {
  constructor(props) {
    super(props)
    this.routeToFilter = this.routeToFilter.bind(this)
  }

  routeToFilter() {
    this.props.navigator.push({
      name: 'Filter',
      component: Filter,
      backButtonText: 'Cancel'
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.headline}>Hungry?</Text>
        <Text
          onPress={this.routeToFilter}
          style={styles.button}>
          Find your Food Mates.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: { backgroundColor: 'red' },
  headline: {},
  button: {}
})
