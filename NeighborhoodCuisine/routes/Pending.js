import React, {
  Component,
  View,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native'
import _ from 'lodash'

var ProgressBar = require('ProgressBarAndroid');

import Group from './Group'
import { getMatch } from '../lib/Endpoint'

class Spinner extends Component {
  render() {
    return (
        <ProgressBar color="#ffffff"/>
    );
  }
}

class PendingText extends Component {
  render() {
    return (
        <Text style={styles.pendingText}>Finding something to cook!</Text>
    );
  }
}

class MatchBox extends Component {

  render() {
    return (
      <View style={styles.matchBox}>
        <Spinner/>
        <PendingText/>
      </View>
    )
  }
}

const TIMEOUT = 2000;

export default class Pending extends Component {

  constructor() {
    super()
    this.fetchMatches()
    this.time = 0
  }

  routeToMatch(data) {
    this.props.navigator.push({
      name: 'Cooking Group',
      backButtonText: 'Cancel',
      component: Group,
      hideLeft: true,
      hideTitle: true,
      passProps: { groupData: data },
      backgroundImage: require('../images/Background-Hungry.png')
    })
  }

  fetchMatches() {
    console.log('fetchMatches')
    this.time = Date.now()
    getMatch()
      .then(response => response.json())
      .then(json => {
        const now = Date.now()
        const diff = now - this.time
        this.time = now
        const time = diff / 1000
        console.log('response with time: ', time, json)
        if (_.isEmpty(json)) {
          setTimeout(this.fetchMatches.bind(this), TIMEOUT)
        } else {
          this.routeToMatch(json)
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <View>
        <MatchBox />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  matchBox: {
    marginHorizontal: 20,
    padding: 10,
    justifyContent: 'center',
    height: 400
  },
  pendingText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30
  }
});
