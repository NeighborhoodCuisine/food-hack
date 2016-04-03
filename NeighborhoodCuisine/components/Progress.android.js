import React, {
  Component,
  View,
  ProgressBarAndroid
} from 'react-native'

export default class Progress extends Component {
  render() {
    return (
      <View>
        <ProgressBarAndroid color="#ffffff"/>
      </View>
    );
  }
}