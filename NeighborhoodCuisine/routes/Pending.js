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

var ProgressBar = require('ProgressBarAndroid');

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

export default class Pending extends Component {
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
