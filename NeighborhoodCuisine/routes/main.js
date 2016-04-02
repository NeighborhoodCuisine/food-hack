import React, { Component,
                View,
                Text,
                StyleSheet } from 'react-native'

class Main extends Component {
  routeToFilter() {
    console.log('route to filter')
  }

  render() {
    console.log('render me')
    return (
      <View>
        <Text style={styles.headline}>Hungry?</Text>
        <Text
          onPress={this.routeToFilter}
          style={styles.button}>Find your Food Mates.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headline: {},
  button: {}
})

module.exports = Main
