import React, {
  View,
  Component,
  StyleSheet } from 'react-native'

export default class Layout extends Component {
  render() {
    console.log(this.props.children)
    return (
      <View style={styles.layoutContainer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layoutContainer: {

  }
})
