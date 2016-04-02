import React, { Component,
                View,
                Text,
                StyleSheet,
                Image,
                TouchableHighlight } from 'react-native'
import Filter from './Filter'
import CommonStyles from '../components/Styles'

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
        <Text style={[CommonStyles.text, CommonStyles.heading, CommonStyles.textPadding]}>Welcome to</Text>
        <Text style={[CommonStyles.text, CommonStyles.heading, CommonStyles.textPadding]}>Neighborhood Cuisine</Text>
        <Text style={[
          CommonStyles.text,
          CommonStyles.textPadding,
          CommonStyles.subheading,
          styles.spacing
        ]}>Get ready to dine.</Text>
        <TouchableHighlight onPress={this.routeToFilter}>
          <Text>Login with Facebook</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {},
  headline: {},
  button: {},
  spacing: {
    paddingTop: 8
  }
})
