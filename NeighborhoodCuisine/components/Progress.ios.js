import React, {
  Component,
  View,
  ActivityIndicatorIOS
} from 'react-native'

export default class Progress extends Component {
  render() {
    return (
      <View>
        <ActivityIndicatorIOS
          style={{height: 80}}
          color="white"
          size="large"
        />
      </View>
    );
  }
}